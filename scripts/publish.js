const { getPackageInfo } = require('./pkg-utils')

const inputPkg = args._[0] || 'vexip-ui'
const isDryRun = args.dry || args.d
const releaseTag = args.tag || args.t

main()

async function main() {
  const { pkgDir } = await getPackageInfo(inputPkg)

  logger.withStartLn(() => logger.infoText('Publishing package...'))

  const publishArgs = [
    'publish',
    '--access',
    'public',
    '--registry=https://registry.npmjs.org/'
  ]

  if (isDryRun) {
    publishArgs.push('--dry-run')
  }

  if (releaseTag) {
    publishArgs.push('--tag', releaseTag)
  }

  try {
    await run('pnpm', publishArgs, { stdio: 'pipe', cwd: pkgDir })
    logger.successText(`Successfully published v${version}'`)
  } catch (err) {
    if (err.stderr.match(/previously published/)) {
      logger.errorText(`Skipping already published v'${version}'`)
    } else {
      throw err
    }
  }
}
