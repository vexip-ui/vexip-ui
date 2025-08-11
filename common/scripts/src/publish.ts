import { writeFile } from 'node:fs/promises'

import { getPkgInfo, logger, run } from './utils'

export interface PublishOptions {
  pkgDir: string,
  isDryRun?: boolean,
  releaseTag?: string,
}

export async function publish(options: PublishOptions) {
  const { pkg, rawPkg, pkgPath, pkgDir, pkgName } = getPkgInfo(options.pkgDir, true)
  const { engines, ...copiedPkg } = pkg

  logger.withStartLn(() =>
    logger.infoText(
      options.isDryRun ? `Dry run publish ${pkgName}...` : `Publishing package ${pkgName}...`,
    ),
  )

  await writeFile(pkgPath, JSON.stringify(copiedPkg, null, 2), 'utf-8')

  const publishArgs = [
    'publish',
    '--access',
    'public',
    '--registry',
    'https://registry.npmjs.org/',
    '--no-git-checks',
  ]

  if (options.isDryRun) {
    publishArgs.push('--dry-run')
  }

  if (options.releaseTag) {
    publishArgs.push('--tag', options.releaseTag)
  }

  try {
    await run('pnpm', publishArgs, { stdio: 'pipe', cwd: pkgDir })
    logger.successText(`Successfully published v${pkg.version}`)
  } catch (error) {
    if ((error as any).stderr?.match(/previously published/)) {
      logger.errorText(`Skipping already published v${pkg.version}`)
    } else {
      throw error
    }
  } finally {
    await writeFile(pkgPath, rawPkg, 'utf-8')
  }
}
