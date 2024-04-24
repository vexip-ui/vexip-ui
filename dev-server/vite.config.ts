import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import comp from 'unplugin-vue-components/vite'
import autoprefixer from 'autoprefixer'

import type { UserConfig } from 'vite'

if (!process.env.TARGET && process.env.THEME !== 'true') {
  throw new Error('Target component must be specified.')
}

const target = process.env.TARGET
const demos = process.env.DEMOS
const port = parseInt(process.env.PORT || '') || 8008

const componentsDir = resolve(__dirname, '../components')
const directivesDir = resolve(__dirname, '../directives')

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

export default defineConfig(async (): Promise<UserConfig> => {
  const components: string[] = []
  const directives: string[] = []

  const results = await Promise.all([readdir(componentsDir), readdir(directivesDir)])

  await Promise.all([
    ...results[0].map(async f => {
      const path = resolve(componentsDir, f)

      if ((await stat(path)).isDirectory() && existsSync(`${path}/index.ts`)) {
        components.push(f)
      }
    }),
    ...results[1].map(async f => {
      const path = resolve(directivesDir, f)

      if ((await stat(path)).isDirectory() && existsSync(`${path}/index.ts`)) {
        directives.push(f)
      }
    })
  ])

  return {
    publicDir: '../docs/public',
    define: {
      __TARGET__: JSON.stringify(target),
      __DEMOS__: demos,
      __VERSION__: JSON.stringify('*'),
      __THEME__: JSON.stringify(process.env.THEME === 'true'),
      __PORT__: JSON.stringify(port)
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
        {
          find: /^@vexip-ui\/(bem-helper|utils|hooks|config)/,
          replacement: resolve(__dirname, '../common/$1/src')
        },
        { find: /^vexip-ui$/, replacement: resolve(__dirname, '../index.ts') }
      ]
    },
    server: {
      port,
      fs: {
        allow: ['..']
      }
    },
    optimizeDeps: {
      include: ['../components', '@vexip-ui/icons']
    },
    css: {
      postcss: {
        plugins: [autoprefixer]
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      comp({
        dts: false,
        resolvers: [
          {
            type: 'component',
            resolve: name => {
              const kebabName = typography.includes(name) ? 'typography' : toKebabCase(name)

              if (components.includes(kebabName)) {
                return {
                  name,
                  from: `@/components/${kebabName}/index.ts`
                }
              }
            }
          },
          {
            type: 'directive',
            resolve: name => {
              const kebabName = toKebabCase(name)

              if (directives.includes(kebabName)) {
                return {
                  name: `v${name}`,
                  from: `@/directives/${kebabName}/index.ts`
                }
              }
            }
          }
        ],
        exclude: ['../components/**']
      })
    ]
  }
})

function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}
