import { existsSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'

import { getPkgInfo, logger, run } from './utils'

export interface PublishOptions {
  pkgDir: string,
  isDryRun?: boolean,
  releaseTag?: string,
}

function isPnpmProject(pkgDir: string) {
  let dir = pkgDir
  while (dir !== resolve(dir, '..')) {
    if (
      existsSync(resolve(dir, 'pnpm-workspace.yaml')) ||
      existsSync(resolve(dir, 'pnpm-lock.yaml'))
    ) {
      return true
    }
    dir = resolve(dir, '..')
  }
  return false
}

function getTarballName(pkgName: string, version: string) {
  return `${pkgName.replace('@', '').replace('/', '-')}-${version}.tgz`
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

  const usePnpm = isPnpmProject(pkgDir)
  const tarballName = getTarballName(pkgName, String(pkg.version))
  const tarballPath = resolve('/tmp', tarballName)

  const publishArgs = ['publish', '--access', 'public', '--registry', 'https://registry.npmjs.org/']

  if (options.isDryRun) {
    publishArgs.push('--dry-run')
  }

  if (options.releaseTag) {
    publishArgs.push('--tag', options.releaseTag)
  }

  try {
    if (usePnpm) {
      const packArgs = ['pack', '--pack-destination', '/tmp']
      if (options.isDryRun) {
        packArgs.push('--dry-run')
      }
      await run('pnpm', packArgs, { stdio: 'pipe', cwd: pkgDir })
      await run('npm', ['publish', tarballPath, ...publishArgs.slice(1)], { stdio: 'pipe' })
    } else {
      await run('npm', publishArgs, { stdio: 'pipe', cwd: pkgDir })
    }
    logger.successText(`Successfully published v${pkg.version}`)
  } catch (error) {
    if ((error as any).stderr?.match(/previously published/)) {
      logger.errorText(`Skipping already published v${pkg.version}`)
    } else {
      throw error
    }
  } finally {
    await writeFile(pkgPath, rawPkg, 'utf-8')
    if (usePnpm) {
      try {
        await unlink(tarballPath)
      } catch {
        // ignore
      }
    }
  }
}
