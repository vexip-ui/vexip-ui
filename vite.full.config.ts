// This config is for building library, do not use to create serve.

import { resolve } from 'path'
import { readFileSync } from 'fs'
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
const componentsDir = resolve(__dirname, 'components')

const logLevel = process.env.LOG_LEVEL
const sourceMap = process.env.SOURCE_MAP === 'true'

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
    build: {
      sourcemap: sourceMap,
      lib: {
        entry: resolve(componentsDir, 'full-lib.ts'),
        formats: ['es', 'cjs'],
        fileName: 'vexip-ui'
      },
      rollupOptions: {
        external: ['vue']
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
        exclude: ['node_modules', 'playground', 'common/hooks', 'common/icons', 'common/utils'],
        compilerOptions: { sourceMap },
        copyDtsFiles: false
      })
    ]
  }
})
