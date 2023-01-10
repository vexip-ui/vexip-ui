import { resolve } from 'node:path'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { statSync, existsSync } from 'node:fs'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { rootDir, prettierConfig, logger, components as allComponents, toCapitalCase } from './utils'

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice', 'toast']
  const ignores = ['typography']
  const typography = ['Title', 'Text', 'Blockquote', 'OL', 'UL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'Strong']
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))
  const directives = await readDirectives()

  const index = `
    ${
      exportComponents.map(component => `import { ${toCapitalCase(component)} } from './${component}'`).join('\n')
    }

    import {
      ${typography.join(',\n')}
    } from './typography'

    import { install as installDirectives } from '@/directives'

    import { buildInstall } from './create'

    export type {
      ComponentSize,
      ComponentState,
      LocaleConfig,
      LocaleNames,
      LocaleOptions
    } from '@vexip-ui/config'
    export type { PropsOptions } from './props'

    export { version } from './version'

    const components = [
      ${components.map(toCapitalCase).join(',\n')},
      // plugins
      ${plugins.map(toCapitalCase).join(', ')},
      // typography
      ${typography.join(',\n')},
      // directives
      installDirectives
    ]

    export { buildInstall }
    export const install = buildInstall(components)

    ${
      allComponents.map(component => `export * from './${component}'`).join('\n')
    }

    ${
      directives.map(directive => `export * from '@/directives/${directive.name}'`).join('\n')
    }
  `

  const types = `
    declare module 'vue' {
      export interface GlobalComponents {
        ${
          [...components, ...typography]
            .map(name => `${toCapitalCase(name)}: typeof import('vexip-ui')['${toCapitalCase(name)}']`)
            .join(',\n')
        }
      }

      interface ComponentCustomProperties {
        ${plugins.map(name => `$${name}: typeof import('vexip-ui')['${toCapitalCase(name)}']`).join(',\n')}
      }
    }

    export {}
  `

  const metaData = `
    {
      components: [
        ${exportComponents.map(name => `"${toCapitalCase(name)}"`).join(',\n')},
        ${typography.map(name => `"${toCapitalCase(name)}"`).join(',\n')}
      ],
      styleAlias: {
        ${typography.map(name => `"${toCapitalCase(name)}": "Typography"`)}
      },
      directives: {
        ${directives.map(directive => `"v${toCapitalCase(directive.name)}": ${JSON.stringify(directive.components)}`).join(',\n')}
      }
    }
  `

  const demoPrefix = `
    import { ref } from 'vue'
    import { isClient, toCapitalCase } from '@vexip-ui/utils'

    const components = [
      ${components.map(name => `'${toCapitalCase(name)}'`).join(',\n')},
      ${typography.map(name => `'${toCapitalCase(name)}'`).join(',\n')},
    ]

    const prefixKey = 'vexip-docs-prefer-demo-prefix'
    const prefix = ref(isClient ? localStorage.getItem(prefixKey) || '' : '')

    const templateRE = /<template>[\\s\\S]*<\\/template>/
    const replaceRE = new RegExp(\`(\${components.join('|')})\`, 'g')

    export function getDemoPrefix() {
      return prefix.value
    }

    export function setDemoPrefix(value: string) {
      prefix.value = value
      isClient && localStorage.setItem(prefixKey, prefix.value)
    }

    export function transformDemoCode(code: string) {
      return code.replace(templateRE, s => s.replace(replaceRE, \`\${toCapitalCase(prefix.value)}$1\`))
    }
  `

  const eslint = new ESLint({ fix: true })
  const indexPath = resolve(rootDir, 'components/index.ts')
  const typesPath = resolve(rootDir, 'types.d.ts')
  const metaDataPath = resolve(rootDir, 'meta-data.json')
  const demoPrefixPath = resolve(rootDir, 'docs/common/demo-prefix.ts')

  await writeFile(
    indexPath,
    prettier.format(index, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )
  await writeFile(
    typesPath,
    prettier.format(types, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )
  await writeFile(
    metaDataPath,
    prettier.format(metaData, { ...prettierConfig, parser: 'json' }),
    'utf-8'
  )
  await writeFile(
    demoPrefixPath,
    prettier.format(demoPrefix, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await ESLint.outputFixes(await eslint.lintFiles(indexPath))
  await ESLint.outputFixes(await eslint.lintFiles(typesPath))
  await ESLint.outputFixes(await eslint.lintFiles(metaDataPath))
  await ESLint.outputFixes(await eslint.lintFiles(demoPrefixPath))

  await Promise.all(
    allComponents
      .filter(component => !existsSync(`style/${component}.scss`))
      .map(component => writeFile(`style/${component}.scss`, '', 'utf-8'))
  )

  const styleIndex = '@forward \'./design/variables.scss\';\n\n@use \'./preset.scss\';\n\n' +
    allComponents.map(component => `@use './${component}.scss';`).join('\n') + '\n'
  const stylePath = resolve(rootDir, 'style/index.scss')

  await writeFile(
    stylePath,
    prettier.format(styleIndex, { ...prettierConfig, parser: 'scss' }),
    'utf-8'
  )
}

async function readDirectives() {
  const componentRE = /import \{ (.+) \} from '@\/components\/.+'/
  const directivesDir = resolve(rootDir, 'directives')
  const directives = await Promise.all(
    (await readdir(directivesDir))
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

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
