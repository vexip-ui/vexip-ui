import fs from 'node:fs'

import minimist from 'minimist'
import semver from 'semver'
import prompts from 'prompts'
import { dryRun, getPackageInfo, logger, run } from './utils'

import type { ReleaseType } from 'semver'

const args = minimist<{
  d?: boolean,
  dry?: boolean,
  p?: string,
  preid?: string
}>(process.argv.slice(2))

const inputPkg = args._[0]
const isDryRun = args.dry || args.d

const runIfNotDry = isDryRun ? dryRun : run
const logStep = (msg: string) => logger.withStartLn(() => logger.infoText(msg))
const logSkipped = (msg = 'Skipped') => logger.warningText(`(${msg})`)

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const { pkgName, pkgDir, pkgPath, pkg, isRoot, currentVersion } = await getPackageInfo(inputPkg)

  const preId = String(args.preid || args.p || (semver.prerelease(currentVersion)?.[0] ?? ''))

  const versionIncrements: ReleaseType[] = [
    'patch',
    'minor',
    'major',
    ...(preId ? (['prepatch', 'preminor', 'premajor', 'prerelease'] as const) : [])
  ]

  const inc = (i: ReleaseType) => semver.inc(currentVersion, i, preId)

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: 'Select release type:',
    choices: versionIncrements
      .map(i => `${i} (${inc(i)})`)
      .concat(['custom'])
      .map(i => ({ title: i, value: i }))
  })

  const version =
    release === 'custom'
      ? (
          await prompts({
            type: 'text',
            name: 'version',
            message: 'Input custom version:'
          })
        ).version
      : release.match(/\((.*)\)/)![1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  const target = pkgName.startsWith('common/') ? pkgName.substring(7) : pkgName
  const tag = isRoot ? `v${version}` : `${target}@${version}`

  const { confirm } = await prompts([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm release ${tag}?`
    }
  ])

  if (!confirm) return

  // 执行单元测试
  logStep('Running test...')

  if (!isDryRun) {
    if (isRoot) {
      await run('pnpm', ['test'])
    } else if (target === 'bem-helper' || target === 'utils') {
      await run('pnpm', ['test'], { cwd: pkgDir })
    }
  } else {
    logSkipped()
  }

  logStep('Updating version...')

  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  // 构建库
  logStep('Building package...')

  if (!isDryRun) {
    if (isRoot) {
      await run('pnpm', ['build'])
    } else {
      await run('pnpm', ['build'], { cwd: pkgDir })
    }
  } else {
    logSkipped()
  }

  // 更新 Change Log
  logStep('Updating changelog...')

  const changelogArgs = [
    'conventional-changelog',
    '-p',
    'angular',
    '-i',
    'CHANGELOG.md',
    '-s',
    '--commit-path',
    '.'
  ]

  if (!isRoot) {
    changelogArgs.push('--lerna-package', target)
  }

  await run('npx', changelogArgs, { cwd: pkgDir })

  // 提交改动
  logStep('Comitting changes...')

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })

  if (stdout) {
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release${isRoot ? '' : `(${target})`}: v${version}`])
  } else {
    logSkipped('No changes to commit')
  }

  // 推送到远程仓库
  logStep('Pushing to Remote Repository...')

  await runIfNotDry('git', ['tag', tag])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/${tag}`])
  await runIfNotDry('git', ['push'])

  logger.withBothLn(() => {
    if (isDryRun) {
      logger.success('Dry run finished - run git diff to see package changes')
    } else {
      logger.success('Release successfully')
    }
  })
}
