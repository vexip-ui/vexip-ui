// sync the vue version in root package.json to common/hooks, common/config, common/icons and dev-server

import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { cpus } from 'node:os'

import { logger, run } from '@vexip-ui/scripts'
import { runParallel } from '@vexip-ui/utils'
import { rootDir } from './constant'

async function main() {
  const rootPkgPath = resolve(rootDir, 'package.json')
  const rootPkg = JSON.parse(await readFile(rootPkgPath, 'utf-8'))
  const vueVersion = rootPkg.devDependencies.vue

  const packages = [
    'common/hooks',
    'common/config',
    'common/icons',
    'dev-server',
    'docs',
    'playground',
  ]

  let changed = false

  await runParallel(cpus().length, packages, async pkgName => {
    try {
      const pkgPath = resolve(rootDir, pkgName, 'package.json')

      if (!existsSync(pkgPath)) {
        logger.warningText(`package.json not found in ${pkgName}`)
        return
      }

      const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'))

      if (pkg.dependencies?.vue && pkg.dependencies.vue !== vueVersion) {
        pkg.dependencies.vue = vueVersion
        changed = true
      } else if (pkg.devDependencies?.vue && pkg.devDependencies.vue !== vueVersion) {
        pkg.devDependencies.vue = vueVersion
        changed = true
      } else {
        logger.infoText(`vue version in '${pkgName}' is already synced`)
        return
      }

      await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
      logger.infoText(`synced vue version to '${pkgName}'`)
    } catch {
      logger.errorText(`fail to sync vue version to '${pkgName}'`)
    }
  })

  logger.ln()

  if (changed) {
    logger.infoText('install dependencies...')
    await run('pnpm', ['install'])
  } else {
    logger.infoText('no package.json change, skip install')
  }

  logger.withBothLn(() => logger.success('Synced root vue version to under packages'))
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
