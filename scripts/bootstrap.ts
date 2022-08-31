import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { logger, components as allComponents, toCapitalCase } from './utils'

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice', 'toast']
  const ignores: string[] = []
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))
  const prettierConfig = await prettier.resolveConfig(path.resolve('.prettierrc.js'))

  const index = `
    ${
      exportComponents.map(component => `import { ${toCapitalCase(component)} } from './${component}'`).join('\n')
    }

    import { buildInstall } from './create'

    export type {
      PropsOptions,
      LocaleConfig,
      LocaleNames,
      LocaleOptions
    } from '@vexip-ui/config'

    export { version } from './version'

    const components = [
      ${components.map(toCapitalCase).join(',\n')},
      // plugins
      ${plugins.map(toCapitalCase).join(', ')}
    ]

    export { buildInstall }
    export const install = buildInstall(components)

    ${
      exportComponents.map(component => `export * from './${component}'`).join('\n')
    }
  `

  const types = `
    declare module 'vue' {
      export interface GlobalComponents {
        ${components.map(name => `${toCapitalCase(name)}: typeof import('vexip-ui')['${toCapitalCase(name)}']`).join(',\n')}
      }

      interface ComponentCustomProperties {
        ${plugins.map(name => `$${name}: typeof import('vexip-ui')['${toCapitalCase(name)}']`).join(',\n')}
      }
    }

    export {}
  `

  const eslint = new ESLint({ fix: true })
  const indexPath = path.resolve(__dirname, '../components/index.ts')
  const typesPath = path.resolve(__dirname, '../types.d.ts')

  fs.writeFileSync(
    indexPath,
    prettier.format(index, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  fs.writeFileSync(
    typesPath,
    prettier.format(types, { ...prettierConfig, parser: 'typescript' }),
    'utf-8'
  )

  await ESLint.outputFixes(await eslint.lintFiles(indexPath))
  await ESLint.outputFixes(await eslint.lintFiles(typesPath))

  exportComponents
    .filter(component => !fs.existsSync(`style/${component}.scss`))
    .forEach(component => fs.writeFileSync(`style/${component}.scss`, '', 'utf-8'))

  const styleIndex = '@forward \'./design/variables.scss\';\n\n@use \'./preset.scss\';\n\n' +
    exportComponents.map(component => `@use './${component}.scss';`).join('\n') + '\n'
  const stylePath = path.resolve(__dirname, '../style/index.scss')

  fs.writeFileSync(
    stylePath,
    prettier.format(styleIndex, { ...prettierConfig, parser: 'scss' }),
    'utf-8'
  )
}
