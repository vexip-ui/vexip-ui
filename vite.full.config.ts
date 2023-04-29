// This config is for building library, do not use to create serve.

import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

import type { LogLevel } from 'vite'

interface Manifest {
  dependencies?: Record<string, string>,
  peerDependencies?: Record<string, string>,
  version?: string
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest

const logLevel = process.env.LOG_LEVEL

const outDir = 'dist'

export default defineConfig(async () => {
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') },
        { find: '@vexip-ui/config', replacement: resolve(__dirname, 'common/config/src') }
      ]
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log']
    },
    build: {
      outDir,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'full-lib.ts'),
        formats: ['es', 'cjs', 'iife'],
        name: 'VexipUI',
        fileName: format => `vexip-ui.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'js'}`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 10000
    },
    plugins: [
      vue(),
      vueJsx(),
      dts({
        exclude: [
          'node_modules',
          'playground',
          'dev-server',
          'common/hooks',
          'common/icons',
          'common/utils'
        ],
        outputDir: outDir,
        compilerOptions: {
          sourceMap: false
        },
        copyDtsFiles: true
      })
    ]
  }
})
