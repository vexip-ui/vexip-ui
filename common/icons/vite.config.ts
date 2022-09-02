import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glob from 'fast-glob'

import type { LogLevel, LibraryFormats } from 'vite'

const outDir = process.env.OUT_DIR || 'dist'
const format = (process.env.FORMAT || 'es') as LibraryFormats
const logLevel = process.env.LOG_LEVEL

export default defineConfig(async () => {
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    build: {
      outDir,
      sourcemap: false,
      lib: {
        entry: resolve(__dirname, 'vue/index.ts'),
        formats: [format]
      },
      rollupOptions: {
        input: [resolve(__dirname, 'vue/index.ts')],
        external: ['vue'],
        output: {
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, 'vue'),
          entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`
        }
      },
      commonjsOptions: {
        sourceMap: false
      }
    },
    plugins: [vue()]
  }
})
