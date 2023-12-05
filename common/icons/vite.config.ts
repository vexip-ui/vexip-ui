import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import type { LogLevel, UserConfig } from 'vite'

const logLevel = process.env.LOG_LEVEL

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

export default defineConfig(async (): Promise<UserConfig> => {
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
        external,
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
