import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import type { LogLevel } from 'vite'

const logLevel = process.env.LOG_LEVEL

export default defineConfig(async () => {
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    build: {
      outDir: 'es',
      sourcemap: false,
      lib: {
        entry: resolve(__dirname, 'vue/index.ts'),
        name: 'VexipUIIcon'
      },
      rollupOptions: {
        input: [resolve(__dirname, 'vue/index.ts')],
        external: ['vue'],
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: resolve(__dirname, 'vue'),
            dir: 'lib',
            entryFileNames: '[name].js'
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: resolve(__dirname, 'vue'),
            dir: 'es',
            entryFileNames: '[name].mjs'
          }
        ]
      },
      commonjsOptions: {
        sourceMap: false
      }
    },
    plugins: [vue()]
  }
})
