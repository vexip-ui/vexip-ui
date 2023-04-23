import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'url'
import path from 'node:path'
import glob from 'fast-glob'
import { logger } from '../../../scripts/utils'

const __dirname = path.resolve(fileURLToPath(import.meta.url), '..')
const pathOutput = path.resolve(__dirname, '../dist')
const root = path.resolve(__dirname, '../../..')

async function main() {
  if (!existsSync(pathOutput)) {
    mkdirSync(pathOutput)
  }

  const components = await glob('*', {
    cwd: path.resolve(root, 'components'),
    onlyDirectories: true
  })

  writeFileSync(path.resolve(pathOutput, 'components.json'), JSON.stringify(components))
  logger.success('Generated Components Metadata')
}

main()
