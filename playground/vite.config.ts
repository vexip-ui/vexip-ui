import { resolve } from 'path'
import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import serveStatic from 'serve-static'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(({ command }) => {
  const isServe = command === 'serve'

  return {
    define: {
      __VERSION__: JSON.stringify(pkg.version),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '..', '$1') },
        { find: /^vexip-ui\/(.+)/, replacement: resolve(__dirname, '..', '$1') }
      ],
      dedupe: ['vue', 'vexip-ui']
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
          middlewares.use('/icons', serveStatic(resolve(__dirname, '../common/icons/dist')))
        }
      },
      {
        name: 'copy-deps',
        apply: 'build',
        generateBundle() {
          const depPaths: Record<string, string> = {
            'vue.runtime.esm-browser.js': '../node_modules/vue/dist/vue.runtime.esm-browser.js',
            'vexip-ui.js': '../dist/vexip-ui.mjs',
            'style.css': '../dist/style.css',
            'vexip-ui-icons.js': '../common/icons/dist/index.es.js'
          }

          Object.keys(depPaths).forEach(fileName => {
            const filePath = resolve(__dirname, depPaths[fileName])

            this.emitFile({
              fileName,
              type: 'asset',
              source: readFileSync(filePath, 'utf-8')
            })
          })
        }
      }
    ]
  }
})
