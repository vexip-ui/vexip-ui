import path from 'node:path'
import { cpus } from 'node:os'
import fs from 'fs-extra'
import prettier from 'prettier'
import { ESLint } from 'eslint'
import stylelint from 'stylelint'
import minimist from 'minimist'
import prompts from 'prompts'
import {
  rootDir,
  prettierConfig,
  logger,
  components as allComponents,
  runParallel,
  toKebabCase,
  toCapitalCase,
  toCamelCase
} from './utils'

const args = minimist(process.argv.slice(2))
const targets = args._

const eslint = new ESLint({ fix: true })

async function main() {
  if (!targets.length) {
    const name = (
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

  const generatedFiles: Array<{ filePath: string, source: string }> = [
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
          onEvent: eventProp<(bool: boolean) => void>()
        })
        
        export type ${capitalCaseName}Props = ExtractPropTypes<typeof ${camelCaseName}Props>
        export type ${capitalCaseName}CProps = ConfigurableProps<ExtractPropTypes<typeof ${camelCaseName}Props>>
      `
    },
    {
      filePath: path.resolve(rootDir, 'components', kebabCaseName, `${kebabCaseName}.vue`),
      source: `
        <template>
          <div :class="className"></div>
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

            function handleEvent() {
              emitEvent(props.onEvent, props.bool)
            }
        
            return {
              props,
              nh,

              className,

              handleEvent
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
      filePath: path.resolve(rootDir, 'components', kebabCaseName, 'tests', 'ssr.spec.tsx'),
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
    }
  ]

  const demosDir = path.resolve(rootDir, 'docs/demos', kebabCaseName)

  generatedFiles.push(
    {
      filePath: path.resolve(demosDir, 'api.zh-CN.md'),
      source: `
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
      filePath: path.resolve(demosDir, 'api.en-US.md'),
      source: `
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
      filePath: path.resolve(demosDir, 'desc.zh-CN.md'),
      source: '\n'
    },
    {
      filePath: path.resolve(demosDir, 'desc.en-US.md'),
      source: '\n'
    },
    {
      filePath: path.resolve(demosDir, 'demos-meta.json'),
      source: '["basis"]\n'
    },
    {
      filePath: path.resolve(demosDir, 'basis/desc.zh-CN.md'),
      source: `
        ### 基础用法

        最简单的用法。
      `
    },
    {
      filePath: path.resolve(demosDir, 'basis/desc.en-US.md'),
      source: `
        ### Basis Usage

        Simplest usage.
      `
    },
    {
      filePath: path.resolve(demosDir, 'basis/demo.zh-CN.vue'),
      source: `
        <template>
          <${capitalCaseName}></${capitalCaseName}>
        </template>

        <script setup lang="ts"></script>
      `
    },
    {
      filePath: path.resolve(demosDir, 'basis/demo.en-US.vue'),
      source: `
        <template>
          <${capitalCaseName}></${capitalCaseName}>
        </template>

        <script setup lang="ts"></script>
      `
    }
  )

  await Promise.all(
    generatedFiles.map(async ({ filePath, source }) => {
      if (fs.existsSync(filePath)) {
        logger.warningText(`exists ${filePath}, skip`)
        return
      }

      await fs.ensureDir(path.dirname(filePath))

      if (filePath.match(/\.(s|p)?css$/)) {
        await fs.writeFile(filePath, source)
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

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
