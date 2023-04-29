import { resolve } from 'node:path'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import comp from 'unplugin-vue-components/vite'
import autoprefixer from 'autoprefixer'

if (!process.env.TARGET && process.env.THEME !== 'true') {
  throw new Error('Target component must be specified.')
}

const target = process.env.TARGET
const demos = process.env.DEMOS
const port = parseInt(process.env.PORT || '') || 8008

const componentsDir = resolve(__dirname, '../components')
const components = readdirSync(componentsDir).filter(f => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})

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

export default defineConfig(() => {
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
        { find: /^@vexip-ui\/((?!icons).+)/, replacement: resolve(__dirname, '../common/$1/src') },
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
          }
        ],
        exclude: ['../components/**']
      }),
      {
        name: 'single-hmr',
        handleHotUpdate({ modules, file }) {
          if (file.match(/xml$/)) return []

          modules.forEach(m => {
            if (!m.url.match(/\.(s|p)?css/)) {
              m.importedModules = new Set()
              m.importers = new Set()
            }
          })

          return modules
        }
      }
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
