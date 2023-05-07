import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export { logger, components, toCapitalCase } from '../../../scripts/utils'

export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')
export const outputDir = resolve(rootDir, '../../meta-data')
