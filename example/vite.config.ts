import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify('')
  },
  resolve: {
    alias: [{ find: /^@\/(.+)/, replacement: resolve(__dirname, '..', '$1') }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          '@use "sass:math";',
          '@import "@/design/variables.scss";',
          '@import "@/design/mixins.scss";'
        ].join('\n')
      }
    }
  },
  plugins: [vue(), vueJsx()]
})
