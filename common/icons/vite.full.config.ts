import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import type { LogLevel } from 'vite'

const logLevel = process.env.LOG_LEVEL

export default defineConfig(() => {
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    build: {
      outDir: 'dist',
      sourcemap: false,
      lib: {
        entry: resolve(__dirname, 'vue/index.ts'),
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      rollupOptions: {
        external: ['vue']
      },
      commonjsOptions: {
        sourceMap: false
      }
    },
    plugins: [vue()]
  }
})
