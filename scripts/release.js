const fs = require('fs')
// const path = require('path')
const execa = require('execa')
const semver = require('semver')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const { getPackageInfo } = require('./pkg-utils')
const { logger } = require('./utils')

const args = require('minimist')(process.argv.slice(2))

const inputPkg = args._[0]
const isDryRun = args.dry || args.d
const skipTests = args.skipTests || args.st
const skipBuild = args.skipBuild || args.sb
const skipPush = args.skipPush || args.sp

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) => {
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
}
const runIfNotDry = isDryRun ? dryRun : run
const logStep = msg => {
  logger.withStartLn(() => logger.infoText(msg))
}
const logSkipped = (msg = 'Skipped') => {
  logger.warningText(`(${msg})`)
}

main()

async function main() {
  const {
    pkgName,
    pkgDir,
    pkgPath,
    pkg: package,
    isRoot,
    currentVersion
  } = await getPackageInfo(inputPkg)
  
  const preId = typeof (args.preid || args.p) === 'string'
    ? args.preid || args.p
    : semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]

  const versionIncrements = [
    'patch',
    'minor',
    'major',
    ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
  ]

  const inc = i => semver.inc(currentVersion, i, preId)

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type:',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
  })

  const version =
    release === 'custom'
      ? (await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version:'
      })).version
      : release.match(/\((.*)\)/)[1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  const target = pkgName.startsWith('common/') ? pkgName.substring(7) : pkgName
  const tag = `${target}@${version}`

  const { bootstrap = isRoot, confirm } = await prompt([
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
  // logStep('Running test...')

  // if (!skipTests && !isDryRun) {
  //   await run(bin('jest'), ['--clearCache'])
  //   await run(bin('jest'), [
  //     '--bail',
  //     '--runInBand',
  //     '--passWithNoTests'
  //   ])
  // } else {
  //   logSkipped()
  // }

  logStep('Updating version...')

  package.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(package, null, 2) + '\n')

  // 执行引导程序
  if (bootstrap) {
    logStep(`Run bootstrap...`)

    if (!skipBuild && !isDryRun) {
      await run('pnpm', ['bootstrap'])
    } else {
      logSkipped()
    }
  }

  // 构建库
  logStep(`Building package...`)

  if (!skipBuild && !isDryRun) {
    if (isRoot) {
      await run('pnpm', ['build', '--', '-a', '-t', '-r'])
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
      logger.success(`Release successfully`)
    }
  })
}
