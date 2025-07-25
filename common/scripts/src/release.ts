import { writeFile } from 'node:fs/promises'

import semver from 'semver'
import prompts from 'prompts'
import { publish } from './publish'
import { dryRun, getPkgInfo, logger, run } from './utils'

import type { ReleaseType } from 'semver'

export interface ReleaseOptions {
  pkgDir: string,
  isDryRun?: boolean,
  /**
   * @default true
   */
  secondConfirm?: boolean,
  secondConfirmMsg?: string | ((pkgName: string, version: string) => string),
  preId?: string,
  /**
   * If false, will use current package.json version as release version
   *
   * @default true
   */
  updateVersion?: boolean,
  /**
   * You can use the 'release' type to release next pre version.
   */
  updateVersionByType?: 'patch' | 'minor' | 'major' | 'release',
  /**
   * @default true
   */
  gitCommit?: boolean,
  gitCommitScope?: false | string,
  /**
   * @default true
   */
  gitAddTag?: boolean,
  gitTag?: string,
  /**
   * @default true
   */
  gitPush?: boolean,
  gitBranch?: string,
  /**
   * If true, will call publish after pushing to remote repository
   */
  publish?: boolean,
  successMessage?: string,
  /**
   * Whether to run test after build.
   */
  testAfterBuild?: boolean,
  runTest?: false | (() => Promise<unknown>),
  runBuild?: false | (() => Promise<unknown>),
  runChangelog?: false | (() => Promise<unknown>)
}

const logStep = (msg: string) => logger.withStartLn(() => logger.infoText(msg))
const logSkipped = (msg = 'Skipped') => logger.warningText(`(${msg})`)

export async function release(options: ReleaseOptions) {
  const isDryRun = !!options.isDryRun
  const runIfNotDry = isDryRun ? dryRun : run
  const { pkg, pkgPath, pkgName } = getPkgInfo(options.pkgDir, true)

  if (isDryRun) {
    logger.withBothLn(() => logger.infoText(`Dry run release ${pkgName}...`))
  }

  let version: string

  if (options.updateVersion === false) {
    version = pkg.version || '1.0.0'
  } else if (options.updateVersionByType) {
    version = updateVersionByType(pkg.version || '0.0.0', {
      type: options.updateVersionByType,
      preId: options.preId,
    })
  } else {
    version = await selectNextVersion(pkg.version || '0.0.0', {
      preId: options.preId,
      selectMessage: 'Select release type:',
    })
  }

  if (options.secondConfirm !== false) {
    const message =
      (typeof options.secondConfirmMsg === 'function'
        ? options.secondConfirmMsg(pkgName, version)
        : options.secondConfirmMsg) || `Confirm release ${pkgName}@${version}?`
    const { confirm } = await prompts({
      message,
      type: 'confirm',
      name: 'confirm',
    })

    if (!confirm) return false
  } else {
    logger.withBothLn(() => logger.infoText(`Releasing ${pkgName}@${version}...`))
  }

  const runTest = async () => {
    logStep('Running test...')

    if (!isDryRun && options.runTest) {
      await options.runTest()
    } else {
      logSkipped()
    }
  }

  if (!options.testAfterBuild) {
    await runTest()
  }

  logStep('Updating version...')

  if (options.updateVersion !== false) {
    pkg.version = version
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  } else {
    logSkipped()
  }

  logStep('Building package...')

  if (!isDryRun && options.runBuild) {
    await options.runBuild()
  } else {
    logSkipped()
  }

  if (options.testAfterBuild) {
    await runTest()
  }

  logStep('Updating changelog...')

  if (options.runChangelog) {
    await options.runChangelog()
  } else {
    logSkipped()
  }

  logStep('Committing changes...')

  const scope = options.gitCommitScope
  const tag = options.gitTag || (scope ? `${scope}@${version}` : `v${version}`)
  const addTag = options.gitAddTag !== false

  if (options.gitCommit !== false) {
    if ((await run('git', ['diff'], { stdio: 'pipe' })).stdout) {
      await runIfNotDry('git', ['add', '-A'])
      await runIfNotDry('git', ['commit', '-m', `release${scope ? `(${scope})` : ''}: v${version}`])
    } else {
      logSkipped('No changes to commit')
    }
  } else {
    logSkipped()
  }

  logStep('Creating tag...')

  if (addTag) {
    await runIfNotDry('git', ['tag', tag])
  } else {
    logSkipped()
  }

  logStep('Pushing to remote repository...')

  if (options.gitPush !== false) {
    addTag && (await runIfNotDry('git', ['push', 'origin', `refs/tags/${tag}`]))

    if (options.gitBranch) {
      await runIfNotDry('git', ['push', 'origin', options.gitBranch])
    } else {
      await runIfNotDry('git', ['push'])
    }
  } else {
    logSkipped()
  }

  if (options.publish) {
    await publish({
      pkgDir: options.pkgDir,
      isDryRun: options.isDryRun,
      releaseTag: String(options.preId || (semver.prerelease(pkg.version!)?.[0] ?? '')),
    })
  }

  logger.withBothLn(() => {
    if (isDryRun) {
      logger.success('Dry run finished - run git diff to see package changes')
    } else {
      logger.success(options.successMessage || `Release ${tag} successfully`)
    }
  })

  return true
}

function updateVersionByType(
  currentVersion: string,
  options: {
    type: 'patch' | 'minor' | 'major' | 'release',
    preId?: string
  },
) {
  const preId = String(options.preId || (semver.prerelease(currentVersion)?.[0] ?? ''))
  const version = semver.inc(currentVersion, `${preId ? 'pre' : ''}${options.type}`, preId)

  if (!version) {
    throw new Error(`Invalid target version: ${version}`)
  }

  return version
}

export interface ChooseVersionOptions {
  preId?: string,
  selectMessage?: string,
  inputMessage?: string
}

export async function selectNextVersion(
  currentVersion: string,
  options: ChooseVersionOptions = {},
) {
  const preId = String(options.preId || (semver.prerelease(currentVersion)?.[0] ?? ''))

  const versionIncrements: ReleaseType[] = [
    'patch',
    'minor',
    'major',
    ...(preId ? (['prepatch', 'preminor', 'premajor', 'prerelease'] as const) : []),
  ]

  const inc = (type: ReleaseType) => semver.inc(currentVersion, type, preId)

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: options.selectMessage || 'Select version:',
    choices: versionIncrements
      .map(type => `${type} (${inc(type)})`)
      .concat(['custom'])
      .map(type => ({ title: type, value: type })),
  })

  const version =
    release === 'custom'
      ? (
        await prompts({
          type: 'text',
          name: 'version',
          message: options.inputMessage || 'Input custom version:',
        })
      ).version
      : release.match(/\((.*)\)/)![1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  return version as string
}
