import { readdir, readFile } from 'node:fs/promises'
import { statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { resolve } from 'node:path'
import prettier from 'prettier'
import {
  logger,
  rootDir,
  components as allComponents,
  toCapitalCase,
  prettierConfig
} from '../../../scripts/utils'

const __dirname = resolve(fileURLToPath(import.meta.url), '..')
const pathOutput = resolve(__dirname, '../dist')

async function main() {
  if (!existsSync(pathOutput)) {
    mkdirSync(pathOutput)
  }

  const ignores = ['typography']
  const typography = [
    'Title',
    'Text',
    'Blockquote',
    'OL',
    'UL',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'P',
    'Strong'
  ]
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const directives = await readDirectives()

  const metaData = `
{
  "components": [
    ${exportComponents.map(name => `"${toCapitalCase(name)}"`).join(',\n')},
    ${typography.map(name => `"${toCapitalCase(name)}"`).join(',\n')}
  ],
  "styleAlias": {
    ${typography.map(name => `"${toCapitalCase(name)}": "Typography"`)}
  },
  "directives": {
    ${directives
      .map(
        directive => `"v${toCapitalCase(directive.name)}": ${JSON.stringify(directive.components)}`
      )
      .join(',\n')}
  }
}
`

  writeFileSync(
    resolve(pathOutput, 'components.json'),
    prettier.format(metaData, { ...prettierConfig, parser: 'json' }),
    'utf-8'
  )
  logger.success('Generated Components Metadata')
}

async function readDirectives() {
  const componentRE = /import \{ (.+) \} from '@\/components\/.+'/
  const directivesDir = resolve(rootDir, 'directives')
  const directives = await Promise.all(
    (
      await readdir(directivesDir, 'utf-8')
    )
      .filter(f => statSync(resolve(directivesDir, f)).isDirectory())
      .map(async directive => {
        const content = await readFile(resolve(directivesDir, directive, 'index.ts'), 'utf-8')
        const lines = content.split('\n')
        const components: string[] = []

        for (const line of lines) {
          if (!line.startsWith('import')) break
          if (!line) continue

          const matched = line.match(componentRE)

          if (matched?.[1]) {
            components.push(...matched[1].split(',').map(s => s.trim()))
          }
        }

        return { name: directive, components }
      })
  )

  return directives
}

main()
