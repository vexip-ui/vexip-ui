import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const upstreamPkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const getVersion = (name: string) =>
  /^\d/.test(pkg.dependencies[name]) ? pkg.dependencies[name] : pkg.dependencies[name].slice(1)

export default defineConfig(({ command }) => {
  const useServer = command === 'serve'

  return {
    define: {
      __VERSION__: JSON.stringify(upstreamPkg.version),
      __VUE_VERSION__: JSON.stringify(getVersion('vue')),
      __REPL_VERSION__: JSON.stringify(getVersion('@vue/repl')),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
        { find: /^vexip-ui$/, replacement: resolve(__dirname, '../components') },
        { find: /^vexip-ui\/(.+)/, replacement: resolve(__dirname, '../$1') },
        { find: '@vexip-ui/config', replacement: resolve(__dirname, '../common/config/src') }
      ],
      dedupe: useServer ? ['../components', 'vue'] : ['vue', 'vexip-ui']
    },
    publicDir: 'public',
    server: {
      port: 6012,
      fs: {
        allow: ['..']
      }
    },
    build: {
      chunkSizeWarningLimit: 10 * 1024
    },
    optimizeDeps: {
      exclude: ['@vue/repl', 'vue/server-renderer']
    },
    plugins: [vue(), vueJsx()]
  }
})
