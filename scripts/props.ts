import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { cpus } from 'node:os'

import prettier from 'prettier'
import { ESLint } from 'eslint'
import {
  components,
  componentsDir,
  logger,
  prettierConfig,
  runParallel,
  toCamelCase,
  toCapitalCase
} from './utils'

async function main() {
  const ignores = ['config-provider', 'typography']
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

  const existsCProps = new Set<string>()

  await runParallel(cpus().length, components, async component => {
    if (ignores.includes(component)) {
      return
    }

    const indexPath = resolve(componentsDir, component, 'index.ts')
    const cpropsName = `${toCapitalCase(component)}CProps`

    if (existsSync(indexPath)) {
      const index = await readFile(indexPath, 'utf-8')

      if (index.includes(cpropsName)) {
        existsCProps.add(component)
      }
    }
  })

  const imports: string[] = []
  const types: string[] = []

  for (const component of components) {
    if (!existsCProps.has(component)) {
      continue
    }

    const cprops = `${toCapitalCase(component)}CProps`

    imports.push(`import { ${cprops} } from './${component}'`)
    types.push(`${toCamelCase(component)}?: ${cprops}`)
  }

  const props = `
    import type { ComponentSize, ComponentState } from '@vexip-ui/config'

    ${imports.join('\n')}
    import { ${typography.map(name => `${toCapitalCase(name)}CProps`).join()} } from './typography'

    interface SuggestedDefault {
      size?: ComponentSize,
      state?: ComponentState,
      transfer?: boolean,
      disabled?: boolean,
      loading?: boolean,
      clearable?: boolean
    }

    export interface PropsOptions {
      default?: SuggestedDefault & Record<string, any>,
      ${types.join(',\n')},
      ${typography.map(name => `${toCamelCase(name)}?: ${toCapitalCase(name)}CProps`).join(',\n')}
    }
  `

  const eslint = new ESLint({ fix: true })
  const propsPath = resolve(componentsDir, 'props.ts')

  await writeFile(
    propsPath,
    prettier.format(props, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await ESLint.outputFixes(await eslint.lintFiles(propsPath))
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
