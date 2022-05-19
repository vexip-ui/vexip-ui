import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import { logger, components as allComponents, toPascalCase } from './utils'

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice']
  const ignores: string[] = []
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))
  const prettierConfig = await prettier.resolveConfig(path.resolve('.prettierrc.js'))

  const index = `
    ${
      exportComponents.map(component => `import { ${toPascalCase(component)} } from './${component}'`).join('\n')
    }

    import { configProp, configLocale } from '@vexip-ui/config'

    import '@/common/icons'

    import type { App } from 'vue'
    import type { PropOptions, LocaleOptions } from '@vexip-ui/config'

    export { configLocale }

    export interface InstallOptions {
      prefix?: string,
      prop?: Partial<PropOptions>,
      locale?: LocaleOptions
    }

    const components = [
      ${components.map(toPascalCase).join(',\n')}
    ]

    const plugins = [${plugins.map(toPascalCase).join(', ')}]

    export const install = (app: App<unknown>, options: InstallOptions = {}) => {
      const { prefix = '', prop = {}, locale = {} } = options

      configProp(prop)
      configLocale(locale)

      const formatName = typeof prefix === 'string' && prefix.charAt(0).match(/[a-z]/)
        ? (name: string) => name.replace(/([A-Z])/g, '-$1').toLowerCase()
        : (name: string) => name

      components.forEach(component => {
        app.component(\`\${prefix || ''}$\{formatName(component.name)}\`, component)

        if (typeof component.installDirective === 'function') {
          component.installDirective(app)
        }
      })

      plugins.forEach(plugin => {
        app.use(plugin)
      })
    }

    export const version = __VERSION__

    export {
      ${exportComponents.map(toPascalCase).join(',\n')}
    }

    export interface VexipComponents {
      ${
        components.map(component => `${toPascalCase(component)}: typeof ${toPascalCase(component)}`).join(',\n')
      }
    }

    export interface VexipProperties {
      ${plugins.map(plugin => `$${plugin}: typeof ${toPascalCase(plugin)}`)}
    }
  `

  const eslint = new ESLint({ fix: true })
  const indexPath = path.resolve(__dirname, '../components/index.ts')

  fs.writeFileSync(
    indexPath,
    prettier.format(index, { ...prettierConfig, parser: 'typescript' })
  )

  await ESLint.outputFixes(await eslint.lintFiles(indexPath))

  exportComponents
    .filter(component => !fs.existsSync(`style/${component}.scss`))
    .forEach(component => fs.writeFileSync(`style/${component}.scss`, '', 'utf-8'))

  const styleIndex = exportComponents.map(component => `@forward './${component}.scss';`).join('\n') + '\n'
  const stylePath = path.resolve(__dirname, '../style/index.scss')

  fs.writeFileSync(
    stylePath,
    prettier.format(styleIndex, { ...prettierConfig, parser: 'scss' })
  )
}
