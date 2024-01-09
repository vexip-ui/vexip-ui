import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export { components } from '../../../scripts/constant'

export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')
export const outputDir = resolve(rootDir, '../../meta-data')
