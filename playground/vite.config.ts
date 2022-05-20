import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import serveStatic from 'serve-static'

export default defineConfig(({ command }) => {
  const isServe = command === 'serve'

  return {
    define: {
      __VERSION__: JSON.stringify(''),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '..', '$1') }
      ]
    },
    publicDir: !isServe && 'public',
    server: {
      port: 6012
    },
    build: {
      chunkSizeWarningLimit: 10 * 1024
    },
    optimizeDeps: {
      exclude: ['@vue/repl']
    },
    plugins: [
      vue(),
      vueJsx(),
      isServe && {
        name: 'serve-dist',
        configureServer({ middlewares }) {
          middlewares.use('/', serveStatic(resolve(__dirname, '../dist')))
          middlewares.use('/', serveStatic(resolve(__dirname, 'public')))
        }
      },
      {
        name: 'copy-deps',
        generateBundle() {
          const depPaths: Record<string, string> = {
            'vue.runtime.esm-browser.js': '../node_modules/vue/dist/vue.runtime.esm-browser.js',
            'vexip-ui.es.js': '../dist/vexip-ui.es.js',
            'style.css': '../dist/style.css'
          }

          Object.keys(depPaths).forEach(fileName => {
            const filePath = resolve(__dirname, depPaths[fileName])

            this.emitFile({
              fileName,
              type: 'asset',
              source: fs.readFileSync(filePath, 'utf-8')
            })
          })
        }
      }
    ]
  }
})
