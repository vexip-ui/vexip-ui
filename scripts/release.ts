import minimist from 'minimist'
import { logger, release, run } from '@vexip-ui/scripts'
import { getPackageInfo } from './utils'

const args = minimist<{
  d?: boolean,
  dry?: boolean,
  p?: string,
  preid?: string
}>(process.argv.slice(2))

const inputPkg = args._[0]
const isDryRun = args.dry || args.d

async function main() {
  const { pkgName, pkgDir, isRoot } = await getPackageInfo(inputPkg)
  const target = pkgName.startsWith('common/') ? pkgName.substring(7) : pkgName

  await release({
    pkgDir,
    isDryRun,
    preId: args.preid,
    gitCommitScope: !isRoot && target,
    runTest: async () => {
      if (isRoot) {
        await run('pnpm', ['test'])
      } else if (target === 'bem-helper' || target === 'utils') {
        await run('pnpm', ['test'], { cwd: pkgDir })
      }
    },
    runBuild: async () => {
      if (isRoot) {
        await run('pnpm', ['build'])
      } else {
        await run('pnpm', ['build'], { cwd: pkgDir })
      }
    },
    runChangelog: async () => {
      const changelogArgs = [
        'conventional-changelog',
        '-p',
        'angular',
        '-i',
        'CHANGELOG.md',
        '-s',
        '--commit-path',
        '.',
      ]

      if (!isRoot) {
        changelogArgs.push('--lerna-package', target)
      }

      await run('npx', changelogArgs, { cwd: pkgDir })
    },
  })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
