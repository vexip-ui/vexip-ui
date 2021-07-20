const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const { components: allComponents, toPascalCase } = require('./utils')

main()

async function main() {
  const plugins = ['confirm', 'contextmenu', 'loading', 'message', 'notice']
  const components = allComponents.filter(c => !plugins.includes(c))
  const prettierConfig = await prettier.resolveConfig(path.resolve('.prettierrc.js'))

  const index = `
    import '@/themes/common.scss'

    ${
      allComponents.map(component => `import { ${toPascalCase(component)} } from '@/components/${component}'`).join('\n')
    }

    import { config } from '@/common/config/install'
    import { isObject } from '@/common/utils/common'

    import '@/common/icons'

    import type { App } from 'vue'
    import type { InstallOptions } from '@/common/config/install'

    const components = [
      ${components.map(toPascalCase).join(',\n')}
    ]

    const plugins = [${plugins.map(toPascalCase).join(', ')}]

    export const install = (
      app: App<unknown>,
      { prefix = '', ...options }: Partial<InstallOptions> & { prefix?: string } = {}
    ) => {
      config.defaults = { ...(options.defaults ?? {}) }
    
      Object.keys(options).forEach(key => {
        if (key !== 'defaults' && isObject(options[key])) {
          config[key] = { ...options[key] }
        }
      })
    
      components.forEach(component => {
        let name = component.name
    
        if (typeof prefix === 'string' && prefix.charAt(0).match(/[a-z]/)) {
          name = name.replace(/([A-Z])/g, '-$1').toLowerCase()
        }
    
        app.component(\`\${prefix}\${name}\`, component)
      })

      plugins.forEach(plugin => {
        app.use(plugin)
      })
    }

    export const version = __VERSION__

    export {
      ${allComponents.map(toPascalCase).join(',\n')}
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

  fs.writeFileSync(
    path.resolve(__dirname, '../components/index.ts'),
    prettier.format(index, { ...prettierConfig, parser: 'typescript' })
  )
}

