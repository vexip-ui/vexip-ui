import path from 'node:path'
import { cpus } from 'node:os'

import fs from 'fs-extra'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import stylelint from 'stylelint'
import minimist from 'minimist'
import prompts from 'prompts'
import {
  components as allComponents,
  logger,
  prettierConfig,
  rootDir,
  runParallel,
  toCamelCase,
  toCapitalCase,
  toKebabCase
} from './utils'
import pkg from '../package.json'

let name: string

const args = minimist(process.argv.slice(2))
const targets = args._
const compType = (
  await prompts({
    type: 'select',
    name: 'compType',
    message: 'select a component type',
    choices: [
      { title: 'basis (基础)', value: 'basis' },
      { title: 'layout (布局)', value: 'layout' },
      { title: 'navigation (导航)', value: 'navigation' },
      { title: 'form (表单)', value: 'form' },
      { title: 'data (数据)', value: 'data' },
      { title: 'effect (反应)', value: 'effect' },
      { title: 'else (其他)', value: 'else' }
    ]
  })
).compType

const eslint = new ESLint({ fix: true })

async function main() {
  if (!targets.length) {
    name = (
      await prompts({
        type: 'text',
        name: 'component',
        message: 'Input a component name:'
      })
    ).component

    if (!name || allComponents.includes(name)) {
      process.exit(1)
    } else {
      logger.ln()

      await create(name)
      targets.push(name)
    }
  } else {
    if (targets.some(name => !name || allComponents.includes(name))) {
      process.exit(1)
    } else {
      name = targets[0]
      await runParallel(cpus().length, targets, create)
    }
  }

  logger.withBothLn(() => {
    if (!process.exitCode) {
      if (targets.length > 1) {
        logger.success('All components created successfully')
      } else {
        logger.success(`Component '${targets[0]}' created successfully`)
      }
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
    camelCaseName = capitalCaseName.charAt(0).toLowerCase() + capitalCaseName.slice(1)
  } else {
    kebabCaseName = name
    capitalCaseName = toCapitalCase(name)
    camelCaseName = toCamelCase(name)
  }

  const generatedFiles: Array<{ filePath: string, source: string, convert?: boolean }> = [
    {
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'index.ts'),
      source: `
        import ${capitalCaseName} from './${kebabCaseName}.vue'

        export { ${capitalCaseName} }
        export type ${capitalCaseName}Exposed = InstanceType<typeof ${capitalCaseName}>

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
      filePath: path.resolve(rootDir, 'components', kebabCaseName, `${kebabCaseName}.vue`),
      source: `
        <template>
          <div :class="className" @click="handleClick"></div>
        </template>

        <script lang="ts">
        import { defineComponent, computed } from 'vue'
        import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
        import { ${camelCaseName}Props } from './props'

        export default defineComponent({
          name: '${capitalCaseName}',
          props: ${camelCaseName}Props,
          emits: [],
          setup(_props) {
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

            return {
              props,
              nh,

              className,

              handleClick
            }
          }
        })
        </script>
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
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'tests/ssr.spec.tsx'),
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

          @include basis;
        }
      `
    },
    {
      filePath: path.resolve(rootDir, 'docs/zh-CN/component', `${kebabCaseName}.md`),
      source: `
        # ${capitalCaseName}

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
      filePath: path.resolve(rootDir, 'docs/en-US/component', `${kebabCaseName}.md`),
      source: `
        # ${capitalCaseName}

        <!-- Please remove this comment and descript what scenes to be used of the component -->

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
      filePath: path.resolve(rootDir, 'docs/demos', kebabCaseName, 'basis/demo.zh-CN.vue'),
      source: `
        <template>
          <${capitalCaseName}></${capitalCaseName}>
        </template>

        <script setup lang="ts"></script>
      `
    },
    {
      filePath: path.resolve(rootDir, 'docs/demos', kebabCaseName, 'basis/demo.en-US.vue'),
      source: `
        <template>
          <${capitalCaseName}></${capitalCaseName}>
        </template>

        <script setup lang="ts"></script>
      `
    },
    ...(await getConvertCompTypeFiles())
  ]

  await Promise.all(
    generatedFiles.map(async ({ filePath, source, convert }) => {
      if (fs.existsSync(filePath) && !convert) {
        logger.warningText(`exists ${filePath}, skip`)
        return
      }

      await fs.ensureDir(path.dirname(filePath))

      if (filePath.match(/\.(s|p)?css$/)) {
        await fs.writeFile(filePath, prettier.format(source, { ...prettierConfig, parser: 'scss' }))
        await stylelint.lint({
          cwd: rootDir,
          fix: true,
          files: filePath
        })
      } else if (filePath.endsWith('.md')) {
        await fs.writeFile(
          filePath,
          prettier.format(
            source
              .split('\n')
              .map(line => line.trim())
              .join('\n'),
            { ...prettierConfig, parser: 'markdown' }
          )
        )
      } else if (filePath.endsWith('.json')) {
        await fs.writeFile(
          filePath,
          prettier.format(source, {
            ...prettierConfig,
            parser: 'json'
          })
        )
      } else {
        if (filePath.endsWith('.vue')) {
          await fs.writeFile(
            filePath,
            prettier.format(source, {
              ...prettierConfig,
              parser: 'vue'
            })
          )
        } else {
          await fs.writeFile(
            filePath,
            prettier.format(source, {
              ...prettierConfig,
              parser: 'typescript'
            })
          )
        }

        await ESLint.outputFixes(await eslint.lintFiles(filePath))
      }

      logger.infoText(`generated ${filePath}`)
    })
  )
}

async function getConvertCompTypeFiles(): Promise<
  Array<{ filePath: string, source: string, convert?: boolean }>
> {
  const capitalCaseName = toCapitalCase(name)
  const capitalCaseCompType = toCapitalCase(compType)

  const compConfigPath = path.resolve(rootDir, 'docs/.vitepress/config/component.ts')
  const i18nUsPath = path.resolve(rootDir, 'docs/.vitepress/theme/i18n/en-US.ts')
  const i18nCnPath = path.resolve(rootDir, 'docs/.vitepress/theme/i18n/zh-CN.ts')
  const i18nHelperPath = path.resolve(rootDir, 'docs/.vitepress/theme/i18n/helper.ts')

  const compConfigSource = (await fs.readFile(compConfigPath, 'utf-8')).split('\n')
  const i18nUsSource = (await fs.readFile(i18nUsPath, 'utf-8')).split('\n')
  const i18nCnSource = (await fs.readFile(i18nCnPath, 'utf-8')).split('\n')
  const i18nHelperSource = (await fs.readFile(i18nHelperPath, 'utf-8')).split('\n')

  const compConfigIndex = compConfigSource.findIndex(i => i.includes(`name: '${compType}'`)) + 2
  const compConfigEndIndex = compConfigSource.findIndex(
    (item, index) => index > compConfigIndex && item.includes(']')
  )
  const i18nUsIndex = i18nUsSource.findIndex(i => i.includes(`// ${capitalCaseCompType}`)) + 1
  const i18nCnIndex = i18nCnSource.findIndex(i => i.includes(`// ${capitalCaseCompType}`)) + 1
  const i18nHelperIndex =
    i18nHelperSource.findIndex(i => i.includes(`// ${capitalCaseCompType}`)) + 1

  compConfigSource.splice(compConfigIndex, 0, `{ name: '${name}', since: '${getSinceVersion()}' },`)

  const convertCompConfig = compConfigSource
    .slice(compConfigIndex, compConfigEndIndex + 1)
    .sort((pre, cur) => {
      const preValue = pre
        .match(/name:\s*['"]([\w]+)['"]/)?.[1]
        .charAt(0)
        .toLowerCase()
      const curValue = cur
        .match(/name:\s*['"]([\w]+)['"]/)?.[1]
        .charAt(0)
        .toLowerCase()

      return preValue?.localeCompare(curValue as string) as number
    })

  compConfigSource.splice(
    compConfigIndex,
    compConfigEndIndex - compConfigIndex + 1,
    ...convertCompConfig
  )

  i18nUsSource.splice(i18nUsIndex, 0, `${capitalCaseName}: '${capitalCaseName}',`)
  i18nCnSource.splice(i18nCnIndex, 0, `${capitalCaseName}: '${capitalCaseName} (需翻译为中文)',`)
  i18nHelperSource.splice(i18nHelperIndex, 0, `${capitalCaseName}: string,`)

  return [
    { filePath: compConfigPath, source: compConfigSource.join('\n'), convert: true },
    { filePath: i18nUsPath, source: i18nUsSource.join('\n'), convert: true },
    { filePath: i18nCnPath, source: i18nCnSource.join('\n'), convert: true },
    { filePath: i18nHelperPath, source: i18nHelperSource.join('\n'), convert: true }
  ]
}

function getSinceVersion() {
  const splitStr = pkg.version.split('.')
  let addMidVer = String(parseInt(splitStr[1]) + 1)

  if (addMidVer.length === 2) {
    addMidVer = addMidVer.substring(1)
    splitStr[0] = String(parseInt(splitStr[0]) + 1)
  }
  splitStr[1] = addMidVer

  return splitStr.join('.')
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
