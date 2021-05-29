const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const semver = require('semver')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const { logger, bin } = require('./utils')

const args = require('minimist')(process.argv.slice(2))

const isDryRun = args.dry || args.d
const skipTests = args.skipTests || args.s
const skipBuild = args.skipBuild || args.b
const releaseTag = args.tag || args.t

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) => {
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
}
const runIfNotDry = isDryRun ? dryRun : run
const logStep = msg => {
  logger.ln()
  logger.infoText(msg)
}
const logSkipped = (msg = 'Skipped') => {
  logger.warningText(`(${msg})`)
}

main()

async function main() {
  const package = require('../package.json')
  const currentVersion = package.version

  const preId =
    args.preid ||
    args.p ||
    (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])

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
      ? await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version:'
      }).version
      : release.match(/\((.*)\)/)[1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Confirm release ${version}?`
  })

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
  await fs.writeFile(path.resolve(__dirname, '../package.json'), JSON.stringify(package, null, 2))

  // 构建库
  logStep(`Building package...`)

  if (!skipBuild && !isDryRun) {
    await run('yarn', ['build', '-a', '-t', '-r'])
  } else {
    logSkipped()
  }

  // 更新 Change Log
  logStep('Updating changelog...')

  await run('yarn', ['changelog'])

  // 提交改动
  logStep('Comitting changes...')

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })

  if (stdout) {
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${version}`])
  } else {
    logSkipped('No changes to commit')
  }

  // 发布
  logStep('Publishing package...')

  try {
    await runIfNotDry(
      'npm',
      [
        'publish',
        '--registry https://registry.npmjs.org/',
        ...(releaseTag ? ['--tag', releaseTag] : [])
      ],
      { stdio: 'pipe' }
    )

    logger.successText(`Successfully published v${version}'`)
  } catch (err) {
    if (err.stderr.match(/previously published/)) {
      logger.errorText(`Skipping already published v'${version}'`)
    } else {
      throw err
    }
  }

  // 推送到远程仓库
  logStep('Pushing to Remote Repository...')

  await runIfNotDry('git', ['tag', `v${version}`])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/v${version}`])
  await runIfNotDry('git', ['push'])

  logger.ln()

  if (isDryRun) {
    logger.success('Dry run finished - run git diff to see package changes')
  } else {
    logger.success(`Release successfully`)
  }

  logger.ln()
}
