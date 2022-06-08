import { resolve } from 'path'
import { readdirSync, statSync, existsSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import comp from 'unplugin-vue-components/vite'

if (!process.env.TARGET && process.env.THEME !== 'true') {
  throw new Error('Target component must be specified.')
}

const target = process.env.TARGET
const demos = process.env.DEMOS

const componentsDir = resolve(__dirname, '../components')
const components = readdirSync(componentsDir).filter(f => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})

export default defineConfig(() => {
  return {
    publicDir: '../docs/public',
    define: {
      __TARGET__: JSON.stringify(target),
      __DEMOS__: demos,
      __VERSION__: JSON.stringify('*'),
      __THEME__: JSON.stringify(process.env.THEME === 'true')
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
        { find: /^@vexip-ui\/((?!icons).+)/, replacement: resolve(__dirname, '../common/$1/src') },
        { find: /^vexip-ui\/(es|lib)\/(.+)/, replacement: resolve(__dirname, '../components/$2') },
        { find: /^vexip-ui$/, replacement: resolve(__dirname, '../components') }
      ]
    },
    server: {
      port: parseInt(process.env.PORT || '') || 8000,
      fs: {
        allow: ['..']
      }
    },
    optimizeDeps: {
      include: ['../components']
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
              if (components.includes(toKebabCase(name))) {
                return {
                  name,
                  from: `@/components/${toKebabCase(name)}/index.ts`
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
