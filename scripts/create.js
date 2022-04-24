const fs = require('fs-extra')
const path = require('path')
const prettier = require('prettier')
const { ESLint } = require('eslint')
const stylelint = require('stylelint')
const {
  logger,
  components: allComponents,
  runParallel,
  toKebabCase,
  toPascalCase,
  toCamelCase
} = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const targets = args._

const dirPath = path.resolve(__dirname, '..')

const eslint = new ESLint({ fix: true })

main()

let prettierConfig

async function main() {
  prettierConfig = await prettier.resolveConfig(path.resolve(dirPath, '.prettierrc.js'))

  if (!targets.length) {
    const { prompt } = require('enquirer')
    const name = (await prompt({
      type: 'input',
      name: 'component',
      message: 'Input a component name:'
    })).component

    if (!name || allComponents.includes(name)) {
      process.exitCode = 1
    } else {
      logger.ln()

      await create(name)
      targets.push(name)
    }
  } else {
    if (targets.some(name => !name || allComponents.includes(name))) {
      process.exitCode = 1
    } else {
      await runParallel(require('os').cpus().length, targets, create)
    }
  }

  logger.withBothLn(() => {
    if (!process.exitCode) {
      if (targets.length > 1) {
        logger.success('All components created successfully.')
      } else {
        logger.success(`Component '${targets[0]}' created successfully.`)
      }
    } else {
      logger.error('Component name must be specified and not exists.')
    }
  })
}

async function create(name) {
  if (allComponents.includes(name)) return

  let kebabCaseName
  let pascalCaseName
  let camelCaseName

  if (name.match(/[A-Z]/)) {
    pascalCaseName = name.replace(/-/g, '')
    kebabCaseName = toKebabCase(pascalCaseName)
    camelCaseName = pascalCaseName.charAt(0).toLowerCase() + pascalCaseName.slice(1)
  } else {
    kebabCaseName = name
    pascalCaseName = toPascalCase(name)
    camelCaseName = toCamelCase(name)
  }

  const generatedFiles = [
    {
      filePath: path.resolve(dirPath, 'components', kebabCaseName, 'index.ts'),
      source: `
        import '@/style/${kebabCaseName}.scss'

        export { default as ${pascalCaseName} } from './${kebabCaseName}.vue'
      `
    },
    {
      filePath: path.resolve(dirPath, 'components', kebabCaseName, `${kebabCaseName}.vue`),
      source: `
        <template>
          <div :class="prefix"></div>
        </template>

        <script lang="ts">
        import { defineComponent } from 'vue'
        import { useConfiguredProps } from '@/common/config/install'

        const props = useConfiguredProps('${camelCaseName}', {})

        export default defineComponent({
          name: '${pascalCaseName}',
          props,
          setup() {
            const prefix = 'vxp-${kebabCaseName}'
        
            return {
              prefix
            }
          }
        })
        </script>
      `
    },
    {
      filePath: path.resolve(dirPath, 'components', kebabCaseName, '__serve__', 'index.ts'),
      source: `
        import '@/themes/common.scss'

        import { createApp } from 'vue'
        import App from './app.vue'

        createApp(App).mount('#app')
      `
    },
    {
      filePath: path.resolve(dirPath, 'components', kebabCaseName, '__serve__', 'app.vue'),
      source: `
        <template>
          <${pascalCaseName}></${pascalCaseName}>
        </template>

        <script lang="ts">
        import { defineComponent } from 'vue'
        import { ${pascalCaseName} } from '..'

        export default defineComponent({
          name: 'App',
          components: {
            ${pascalCaseName}
          }
        })
        </script>
      `
    },
    {
      filePath: path.resolve(dirPath, 'style', `${kebabCaseName}.scss`),
      source: `
        .vxp-${kebabCaseName} {
          @include basis;
        }
      `
    }
  ]

  for (const { filePath, source } of generatedFiles) {
    fs.ensureDir(path.dirname(filePath))
    fs.writeFileSync(filePath, source)

    if (filePath.match(/(s|p)?css$/)) {
      await stylelint.lint({
        cwd: dirPath,
        fix: true,
        files: filePath
      })
    } else {
      await ESLint.outputFixes(await eslint.lintFiles(filePath))

      if (filePath.endsWith('.vue')) {
        fs.writeFileSync(
          filePath,
          prettier.format(fs.readFileSync(filePath, 'utf-8'), {
            ...prettierConfig,
            parser: 'vue'
          })
        )
      } else {
        fs.writeFileSync(
          filePath,
          prettier.format(fs.readFileSync(filePath, 'utf-8'), {
            ...prettierConfig,
            parser: 'typescript'
          })
        )
      }
    }

    logger.infoText(`create ${filePath}`)
  }
}
