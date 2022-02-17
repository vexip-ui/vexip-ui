import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(''),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  resolve: {
    alias: [{ find: /^@\/(.+)/, replacement: resolve(__dirname, '..', '$1') }]
  },
  publicDir: resolve(__dirname, '../dist'),
  server: {
    port: 6012,
    fs: {
      strict: false
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          '@use "sass:color";',
          '@use "sass:list";',
          '@use "sass:map";',
          '@use "sass:math";',
          '@import "@/design/variables.scss";',
          '@import "@/design/mixins.scss";'
        ].join('\n')
      }
    }
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  },
  plugins: [
    vue(),
    vueJsx(),
    {
      name: 'copy-deps',
      generateBundle() {
        const filePath = resolve(__dirname, '../node_modules/vue/dist/vue.runtime.esm-browser.js')
        if (!fs.existsSync(filePath)) {
          throw new Error('vue.runtime.esm-browser.js not exists, install it first.')
        }
        this.emitFile({
          type: 'asset',
          fileName: 'vue.runtime.esm-browser.js',
          source: fs.readFileSync(filePath, 'utf-8')
        })
      }
    }
  ]
})
