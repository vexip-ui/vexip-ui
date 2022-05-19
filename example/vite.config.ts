import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from '@rollup/plugin-eslint'

import type { Plugin } from 'vite'

if (!process.env.TARGET) {
  throw new Error('Target component must be specified.')
}

const target = process.env.TARGET
const demos = process.env.DEMOS

const prePlugins = (plugins: Plugin[]): Plugin[] => {
  return plugins.map(plugin => ({ ...plugin, enforce: 'pre', apply: 'build' }))
}

export default defineConfig(() => {
  return {
    define: {
      __TARGET__: JSON.stringify(target),
      __DEMOS__: demos,
      __VERSION__: JSON.stringify('*')
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
        { find: /^@vexip-ui\/(.+)/, replacement: resolve(__dirname, '../common/$1/src') },
        { find: /^vexip-ui\/lib\/(.+)/, replacement: resolve(__dirname, '../components/$1') },
        { find: /^vexip-ui\/es\/(.+)/, replacement: resolve(__dirname, '../components/$1') },
        { find: /^vexip-ui\/icons\/(.+)/, replacement: resolve(__dirname, '../common/icons/$1') }
      ]
    },
    server: {
      port: parseInt(process.env.PORT || '') || 8000
    },
    plugins: [
      ...prePlugins([
        eslint({
          throwOnError: true,
          throwOnWarning: true,
          fix: false,
          include: ['components/**/*.ts', 'components/**/*.vue']
        })
      ]),
      vue(),
      vueJsx(),
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
