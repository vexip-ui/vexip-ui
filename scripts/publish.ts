import minimist from 'minimist'
import { logger, run, getPackageInfo } from './utils'

const args = minimist<{
  d?: boolean,
  dry?: boolean,
  t?: string,
  tag?: string
}>(process.argv.slice(2))

const target = args._[0]
const isDryRun = args.dry || args.d
const releaseTag = args.tag || args.t

async function main() {
  let inputPkg = ''

  if (target?.startsWith('v')) {
    inputPkg = 'vexip-ui'
  } else if (target?.includes('@')) {
    [inputPkg] = target.split('@')

    if (['hooks', 'icons', 'plugins', 'utils'].includes(inputPkg)) {
      inputPkg = `common/${inputPkg}`
    }
  }

  const { pkgDir, currentVersion } = await getPackageInfo(inputPkg)

  logger.withStartLn(() => logger.infoText('Publishing package...'))

  const publishArgs = [
    'publish',
    '--access',
    'public',
    '--registry',
    'https://registry.npmjs.org/',
    '--no-git-checks'
  ]

  if (isDryRun) {
    publishArgs.push('--dry-run')
  }

  if (releaseTag) {
    publishArgs.push('--tag', releaseTag)
  }

  try {
    await run('pnpm', publishArgs, { stdio: 'pipe', cwd: pkgDir })
    logger.successText(`Successfully published v${currentVersion}'`)
  } catch (error) {
    if (error.stderr?.match(/previously published/)) {
      logger.errorText(`Skipping already published v'${currentVersion}'`)
    } else {
      throw error
    }
  }
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
