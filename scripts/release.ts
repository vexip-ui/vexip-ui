import fs from 'fs'
import semver from 'semver'
import { prompt } from 'enquirer'
import { logger, run, dryRun, getPackageInfo } from './utils'

import type { ReleaseType } from 'semver'

const args = require('minimist')(process.argv.slice(2))

const inputPkg = args._[0]
const isDryRun = args.dry || args.d
const skipTests = args.skipTests || args.t
const skipBuild = args.skipBuild || args.b
const skipPush = args.skipPush || args.s

const runIfNotDry = isDryRun ? dryRun : run
const logStep = (msg: string) => logger.withStartLn(() => logger.infoText(msg))
const logSkipped = (msg = 'Skipped') => logger.warningText(`(${msg})`)

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const {
    pkgName,
    pkgDir,
    pkgPath,
    pkg,
    isRoot,
    currentVersion
  } = await getPackageInfo(inputPkg)

  const preId = args.preid || args.p || (semver.prerelease(currentVersion)?.[0])

  const versionIncrements: ReleaseType[] = [
    'patch',
    'minor',
    'major',
    ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] as const : [])
  ]

  const inc = (i: ReleaseType) => semver.inc(currentVersion, i, preId)

  const { release } = await prompt<{ release: string }>({
    type: 'select',
    name: 'release',
    message: 'Select release type:',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
  })

  const version =
    release === 'custom'
      ? (await prompt<{ version: string }>({
          type: 'input',
          name: 'version',
          message: 'Input custom version:'
        })).version
      : release.match(/\((.*)\)/)![1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  const target = pkgName.startsWith('common/') ? pkgName.substring(7) : pkgName
  const tag = isRoot ? `v${version}` : `${target}@${version}`

  const { bootstrap = isRoot, confirm } = await prompt<{ bootstrap: boolean, confirm: boolean }>([
    {
      type: 'confirm',
      name: 'bootstrap',
      message: 'Run bootstrap before build?',
      initial: isRoot,
      skip: !isRoot
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm release ${tag}?`
    }
  ])

  if (!confirm) return

  // 执行单元测试
  logStep('Running test...')

  if (!skipTests && !isDryRun) {
    if (isRoot) {
      await run('pnpm', ['test'])
    }
  } else {
    logSkipped()
  }

  logStep('Updating version...')

  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  // 执行引导程序
  if (bootstrap) {
    logStep('Run bootstrap...')

    if (!skipBuild && !isDryRun) {
      await run('pnpm', ['bootstrap'])
    } else {
      logSkipped()
    }
  }

  // 构建库
  logStep('Building package...')

  if (!skipBuild && !isDryRun) {
    if (isRoot) {
      await run('pnpm', ['build'])
      await run('pnpm', ['build:full'])
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
    await runIfNotDry('git', ['tag', tag])
  } else {
    logSkipped('No changes to commit')
  }

  // 推送到远程仓库
  logStep('Pushing to Remote Repository...')

  if (!skipPush) {
    await runIfNotDry('git', ['push', 'origin', `refs/tags/${tag}`])
    await runIfNotDry('git', ['push'])
  } else {
    logSkipped()
  }

  logger.withBothLn(() => {
    if (isDryRun) {
      logger.success('Dry run finished - run git diff to see package changes')
    } else {
      logger.success('Release successfully')
    }
  })
}
