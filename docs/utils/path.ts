import { resolve } from 'node:path'
import { fileURLToPath } from 'url'

export const docDir = resolve(fileURLToPath(import.meta.url), '../..')
export const rootDir = resolver('..')

export function resolver(path: string) {
  return resolve(docDir, path)
}
