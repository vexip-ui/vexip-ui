import { resolve } from 'node:path'
import { cpus } from 'node:os'
import fs from 'fs-extra'
import { logger, rootDir, components, runParallel } from './utils'

async function main() {
  await copyStyle('es')
  await copyStyle('lib')
}

async function copyStyle(dir: 'es' | 'lib') {
  const ext = dir === 'es' ? 'mjs' : 'cjs'

  await runParallel(cpus().length, [...components, 'preset', 'dark'], async component => {
    if (component === 'icon') return

    await fs.ensureDir(resolve(rootDir, dir, 'style', component))
    await fs.ensureDir(resolve(rootDir, dir, 'css', component))
    await fs.copyFile(
      resolve(rootDir, dir, 'components', component, `style.${ext}`),
      resolve(rootDir, dir, 'style', component, `index.${ext}`)
    )
    await fs.copyFile(
      resolve(rootDir, dir, 'components', component, `css.${ext}`),
      resolve(rootDir, dir, 'css', component, `index.${ext}`)
    )
  })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
