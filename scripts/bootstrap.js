const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const { ESLint } = require('eslint')
const { components: allComponents, toPascalCase } = require('./utils')

main()

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice']
  const ignores = []
  const exportComponents = allComponents.filter(c => !ignores.includes(c))
  const components = exportComponents.filter(c => !plugins.includes(c))
  const prettierConfig = await prettier.resolveConfig(path.resolve('.prettierrc.js'))

  const index = `
    import '@/themes/common.scss'

    ${
      exportComponents.map(component => `import { ${toPascalCase(component)} } from '@/components/${component}'`).join('\n')
    }

    import { configProp } from '@/common/config/install'
    import { configLocale } from '@/common/config/locale'

    import '@/common/icons'

    import type { App } from 'vue'
    import type { PropOptions } from '@/common/config/install'
    import type { LocaleOptions } from '@/common/config/locale'

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
        app.component(\`\${prefix || ''}\$\{formatName(component.name)}\`, component)

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
  const filePath = path.resolve(__dirname, '../components/index.ts')

  fs.writeFileSync(
    filePath,
    prettier.format(index, { ...prettierConfig, parser: 'typescript' })
  )

  await ESLint.outputFixes(await eslint.lintFiles(filePath))
}

