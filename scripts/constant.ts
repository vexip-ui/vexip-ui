import { resolve } from 'node:path'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export { default as prettierConfig } from '../.prettierrc'

export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')

export const componentsDir = resolve(rootDir, 'components')

export const components = readdirSync(componentsDir).filter((f) => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})
