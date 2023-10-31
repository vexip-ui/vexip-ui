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
  preId?: string,
  skipUpdateVersion?: boolean,
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
  publish?: boolean,
  successMessage?: string,
  runTest?: () => Promise<void>,
  runBuild?: () => Promise<void>,
  runChangelog?: () => Promise<void>
}

const logStep = (msg: string) => logger.withStartLn(() => logger.infoText(msg))
const logSkipped = (msg = 'Skipped') => logger.warningText(`(${msg})`)

export async function release(options: ReleaseOptions) {
  const isDryRun = !!options.isDryRun
  const runIfNotDry = isDryRun ? dryRun : run
  const { pkg, pkgPath } = getPkgInfo(options.pkgDir, true)

  const prevVersion = pkg.version || '0.0.0'
  const version = await selectNextVersion(prevVersion, {
    preId: options.preId,
    selectMessage: 'Select release type:'
  })

  if (options.secondConfirm !== false) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Confirm release ${version} (from ${prevVersion})?`
    })

    if (!confirm) return
  }

  logStep('Running test...')

  if (!isDryRun && options.runTest) {
    await options.runTest()
  } else {
    logSkipped()
  }

  logStep('Updating version...')

  if (options.skipUpdateVersion) {
    logSkipped()
  } else {
    pkg.version = version
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  }

  logStep('Building package...')

  if (!isDryRun && options.runBuild) {
    await options.runBuild()
  } else {
    logSkipped()
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
      releaseTag: String(options.preId || (semver.prerelease(pkg.version!)?.[0] ?? ''))
    })
  }

  logger.withBothLn(() => {
    if (isDryRun) {
      logger.success('Dry run finished - run git diff to see package changes')
    } else {
      logger.success(options.successMessage || `Release ${tag} successfully`)
    }
  })
}

export interface ChooseVersionOptions {
  preId?: string,
  selectMessage?: string,
  inputMessage?: string
}

export async function selectNextVersion(
  currentVersion: string,
  options: ChooseVersionOptions = {}
) {
  const preId = String(options.preId || (semver.prerelease(currentVersion)?.[0] ?? ''))

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
    message: options.selectMessage || 'Select version:',
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
            message: options.inputMessage || 'Input custom version:'
          })
        ).version
      : release.match(/\((.*)\)/)![1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  return version as string
}
