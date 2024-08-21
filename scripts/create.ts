import path from 'node:path'

import fs from 'fs-extra'
import { format } from 'prettier'
import { ESLint } from 'eslint'
import stylelint from 'stylelint'
import minimist from 'minimist'
import prompts from 'prompts'
import { logger } from '@vexip-ui/scripts'
import { toCamelCase, toCapitalCase, toKebabCase } from '@vexip-ui/utils'
import {
  components as allComponents,
  prettierConfig,
  rootDir
} from './constant'
import pkg from '../package.json'

const args = minimist(process.argv.slice(2))

let name = args._[0]
let cname: string

const compType = (
  await prompts({
    type: 'select',
    name: 'compType',
    message: 'select a component type',
    choices: [
      { title: 'Basis (基础)', value: 'basis' },
      { title: 'Layout (布局)', value: 'layout' },
      { title: 'Navigation (导航)', value: 'navigation' },
      { title: 'Form (表单)', value: 'form' },
      { title: 'Data (数据)', value: 'data' },
      { title: 'Effect (反应)', value: 'effect' },
      { title: 'Else (其他)', value: 'else' }
    ]
  })
).compType

const eslint = new ESLint({ fix: true })

async function main() {
  if (!name) {
    name = (
      await prompts({
        type: 'text',
        name: 'component',
        message: 'Input a component name:'
      })
    ).component
  }

  if (!name || allComponents.includes(name)) {
    process.exit(1)
  } else {
    cname = (
      await prompts({
        type: 'text',
        name: 'component',
        message: 'Input Chinese name of the component:'
      })
    ).component

    if (!cname) {
      cname = cname || `[${name} 中文]`

      logger.warningText(
        `Get empty Chinese name, you can globally replace '${cname}' with the Chinese name afterwards`
      )
    }

    logger.ln()

    await create(name)
  }

  logger.withBothLn(() => {
    if (!process.exitCode) {
      logger.success(`Component '${name}' created successfully`)
    } else {
      logger.error('Component name must be specified and not exists')
    }
  })
}

async function create(name: string) {
  if (allComponents.includes(name)) return

  let kebabCaseName: string
  let capitalCaseName: string
  let camelCaseName: string

  if (name.match(/[A-Z]/)) {
    capitalCaseName = name.replace(/-/g, '')
    kebabCaseName = toKebabCase(capitalCaseName)
    camelCaseName =
      capitalCaseName.charAt(0).toLowerCase() + capitalCaseName.slice(1)
  } else {
    kebabCaseName = name
    capitalCaseName = toCapitalCase(name)
    camelCaseName = toCamelCase(name)
  }

  const generatedFiles: Array<{
    filePath: string,
    source: string,
    convert?: boolean
  }> = [
    {
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'index.ts'),
      source: `
        import ${capitalCaseName} from './${kebabCaseName}.vue'

        import type { ComponentPublicInstance } from 'vue'

        export { ${capitalCaseName} }
        export { ${camelCaseName}Props } from './props'

        export type ${capitalCaseName}Exposed = ComponentPublicInstance & InstanceType<typeof ${capitalCaseName}>

        export type { ${capitalCaseName}Props, ${capitalCaseName}CProps } from './props'
      `
    },
    {
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'style.ts'),
      source: `
        import '@/components/preset/style'
        import '@/style/${kebabCaseName}.scss'
      `
    },
    {
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'css.ts'),
      source: `
        import '@/components/preset/css'
        import '@/css/${kebabCaseName}.css'
      `
    },
    {
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'props.ts'),
      source: `
        import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

        import type { ExtractPropTypes } from 'vue'
        import type { ConfigurableProps } from '@vexip-ui/config'

        export const ${camelCaseName}Props = buildProps({
          bool: booleanProp,
          onClick: eventProp<(bool: boolean) => void>()
        })

        export type ${capitalCaseName}Props = ExtractPropTypes<typeof ${camelCaseName}Props>
        export type ${capitalCaseName}CProps = ConfigurableProps<ExtractPropTypes<typeof ${camelCaseName}Props>>
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'components',
        kebabCaseName,
        `${kebabCaseName}.vue`
      ),
      source: `
        <script setup lang="ts">
        import { computed } from 'vue'
        import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
        import { ${camelCaseName}Props } from './props'

        defineOptions({ name: '${capitalCaseName}' })

        const _props = defineProps(${camelCaseName}Props)
        const props = useProps('${camelCaseName}', _props, {
          bool: false
        })

        const nh = useNameHelper('${kebabCaseName}')

        const className = computed(() => {
          return [nh.b(), nh.bs('vars')]
        })

        function handleClick() {
          emitEvent(props.onClick, props.bool)
        }
        </script>

        <template>
          <div :class="className" @click="handleClick"></div>
        </template>
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'components',
        kebabCaseName,
        'tests',
        `${kebabCaseName}.spec.tsx`
      ),
      source: `
        import { describe, it, expect } from 'vitest'
        import { mount } from '@vue/test-utils'
        import { ${capitalCaseName} } from '..'

        describe('${capitalCaseName}', () => {
          it('render', () => {
            const wrapper = mount(${capitalCaseName})

            expect(wrapper.classes()).toContain('vxp-${kebabCaseName}-vars')
          })
        })
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'components',
        kebabCaseName,
        'tests/ssr.spec.tsx'
      ),
      source: `
        /**
         * @vitest-environment node
         */

        import { describe, it, expect } from 'vitest'
        import { createSSRApp } from 'vue'
        import { renderToString } from 'vue/server-renderer'
        import { ${capitalCaseName} } from '..'

        describe('SSR for ${capitalCaseName}', () => {
          it('render', async () => {
            try {
              await renderToString(
                createSSRApp(() => <${capitalCaseName}></${capitalCaseName}>)
              )
            } catch (error) {
              expect(error).toBeFalsy()
            }
          })
        })
      `
    },
    {
      filePath: path.resolve(rootDir, 'style', `${kebabCaseName}.scss`),
      source: `
        @use 'sass:map';

        @use './shared' as *;
        @use './design' as *;

        $${kebabCaseName}: () !default;
        $${kebabCaseName}: map.merge(
          (),
          $${kebabCaseName}
        );

        .#{$namespace}-${kebabCaseName} {
          &-vars {
            @include define-preset-values('${kebabCaseName}', $${kebabCaseName});
          }

          @include basis {
            // root styles
          }
        }
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'docs/zh-CN/component',
        `${kebabCaseName}.md`
      ),
      source: `
        # ${cname} ${capitalCaseName} ^[Since v${getSinceVersion()}](!s)

        <!-- 请删除该注释，并描述组件的使用场景 -->

        ## Demos

        :::demo ${kebabCaseName}/basis

        ### 基础用法

        最简单的用法。

        :::

        ## API

        ### ${capitalCaseName} 属性

        | 名称 | 类型 | 说明 | 默认值 | 始于 |
        | ---- | --- | ---- | ------ | --- |

        ### ${capitalCaseName} 事件

        | 名称 | 说明 | 参数 | 始于 |
        | ---- | --- | ---- | ---- |

        ### ${capitalCaseName} 插槽

        | 名称 | 说明 | 参数 | 始于 |
        | ---- | --- | ---- | ---- |
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'docs/en-US/component',
        `${kebabCaseName}.md`
      ),
      source: `
        # ${capitalCaseName} ^[Since v${getSinceVersion()}](!s)

        <!-- Please remove this comment and describe what scenes to be used of the component -->

        ## Demos

        :::demo ${kebabCaseName}/basis

        ### Basis Usage

        Simplest usage.

        :::

        ## API

        ### ${capitalCaseName} Props

        | Name | Type | Description | Default | Since |
        | ---- | ---- | ----------- | ------- | ----- |

        ### ${capitalCaseName} Events

        | Name | Description | Parameters | Since |
        | ---- | ----------- | ---------- | ----- |

        ### ${capitalCaseName} Slots

        | Name | Description | Parameters | Since |
        | ---- | ----------- | ---------- | ----- |
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'docs/demos',
        kebabCaseName,
        'basis/demo.zh-CN.vue'
      ),
      source: `
        <template>
          <${capitalCaseName}></${capitalCaseName}>
        </template>

        <script setup lang="ts"></script>
      `
    },
    {
      filePath: path.resolve(
        rootDir,
        'docs/demos',
        kebabCaseName,
        'basis/demo.en-US.vue'
      ),
      source: `
        <template>
          <${capitalCaseName}></${capitalCaseName}>
        </template>

        <script setup lang="ts"></script>
      `
    },
    ...(await getConvertCompTypeFiles())
  ]

  const shouldLintFiles: string[] = []

  await Promise.all(
    generatedFiles.map(async ({ filePath, source, convert }) => {
      if (fs.existsSync(filePath) && !convert) {
        logger.warningText(`exists ${filePath}, skip`)
        return
      }

      await fs.ensureDir(path.dirname(filePath))

      if (filePath.match(/\.(s|p)?css$/)) {
        await fs.writeFile(
          filePath,
          await format(source, { ...prettierConfig, parser: 'scss' })
        )
        await stylelint.lint({
          cwd: rootDir,
          fix: true,
          files: filePath
        })
      } else if (filePath.endsWith('.md')) {
        await fs.writeFile(
          filePath,
          await format(
            source
              .split('\n')
              .map((line) => line.trim())
              .join('\n'),
            { ...prettierConfig, parser: 'markdown' }
          )
        )
      } else if (filePath.endsWith('.json')) {
        await fs.writeFile(
          filePath,
          await format(source, {
            ...prettierConfig,
            parser: 'json'
          })
        )
      } else {
        if (filePath.endsWith('.vue')) {
          await fs.writeFile(
            filePath,
            await format(source, {
              ...prettierConfig,
              parser: 'vue'
            })
          )
        } else {
          await fs.writeFile(
            filePath,
            await format(source, {
              ...prettierConfig,
              parser: 'typescript'
            })
          )
        }

        shouldLintFiles.push(filePath)
      }

      logger.infoText(`generated ${filePath}`)
    })
  )

  logger.withStartLn(() => logger.infoText('Linting files...'))

  await ESLint.outputFixes(await eslint.lintFiles(shouldLintFiles))

  logger.successText(`Create component '${kebabCaseName}' successful`)
}

async function getConvertCompTypeFiles(): Promise<
  Array<{ filePath: string, source: string, convert?: boolean }>
> {
  const capitalCaseName = toCapitalCase(name)
  const capitalCaseCompType = toCapitalCase(compType)

  const compConfigPath = path.resolve(
    rootDir,
    'docs/.vitepress/config/component.ts'
  )
  const i18nUsPath = path.resolve(
    rootDir,
    'docs/.vitepress/theme/i18n/en-US.ts'
  )
  const i18nCnPath = path.resolve(
    rootDir,
    'docs/.vitepress/theme/i18n/zh-CN.ts'
  )
  const i18nHelperPath = path.resolve(
    rootDir,
    'docs/.vitepress/theme/i18n/helper.ts'
  )

  const compConfigSource = (await fs.readFile(compConfigPath, 'utf-8')).split(
    '\n'
  )
  const i18nUsSource = (await fs.readFile(i18nUsPath, 'utf-8')).split('\n')
  const i18nCnSource = (await fs.readFile(i18nCnPath, 'utf-8')).split('\n')
  const i18nHelperSource = (await fs.readFile(i18nHelperPath, 'utf-8')).split(
    '\n'
  )

  const compConfigIndex =
    compConfigSource.findIndex((i) => i.includes(`name: '${compType}'`)) + 2
  const compConfigEndIndex = compConfigSource.findIndex(
    (item, index) => index > compConfigIndex && item.includes(']')
  )
  const i18nUsIndex =
    i18nUsSource.findIndex((i) => i.includes(`// ${capitalCaseCompType}`)) + 1
  const i18nCnIndex =
    i18nCnSource.findIndex((i) => i.includes(`// ${capitalCaseCompType}`)) + 1
  const i18nHelperIndex =
    i18nHelperSource.findIndex((i) => i.includes(`// ${capitalCaseCompType}`)) +
    1

  compConfigSource.splice(
    compConfigIndex,
    0,
    `{ name: '${capitalCaseName}', since: '${getSinceVersion()}' },`
  )

  const convertCompConfig = compConfigSource
    .slice(compConfigIndex, compConfigEndIndex + 1)
    .sort((prev, next) => {
      const prevValue = prev
        .match(/name:\s*['"]([\w]+)['"]/)?.[1]
        .charAt(0)
        .toLowerCase()
      const nextValue = next
        .match(/name:\s*['"]([\w]+)['"]/)?.[1]
        .charAt(0)
        .toLowerCase()

      return prevValue?.localeCompare(nextValue as string) as number
    })

  compConfigSource.splice(
    compConfigIndex,
    compConfigEndIndex - compConfigIndex + 1,
    ...convertCompConfig
  )

  i18nUsSource.splice(
    i18nUsIndex,
    0,
    `${capitalCaseName}: '${capitalCaseName}',`
  )
  i18nCnSource.splice(i18nCnIndex, 0, `${capitalCaseName}: '${cname}',`)
  i18nHelperSource.splice(i18nHelperIndex, 0, `${capitalCaseName}: string,`)

  return [
    {
      filePath: compConfigPath,
      source: compConfigSource.join('\n'),
      convert: true
    },
    { filePath: i18nUsPath, source: i18nUsSource.join('\n'), convert: true },
    { filePath: i18nCnPath, source: i18nCnSource.join('\n'), convert: true },
    {
      filePath: i18nHelperPath,
      source: i18nHelperSource.join('\n'),
      convert: true
    }
  ]
}

function getSinceVersion() {
  const splitStr = pkg.version.split('.')

  splitStr[1] = String(parseInt(splitStr[1]) + 1)
  splitStr[2] = '0'

  return splitStr.join('.')
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
