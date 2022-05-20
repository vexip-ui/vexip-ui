// This config is for building library, do not use to create serve.

import { resolve } from 'path'
import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import glob from 'fast-glob'

import type { LogLevel, Plugin, LibraryFormats } from 'vite'

interface Manifest {
  dependencies?: Record<string, string>,
  peerDependencies?: Record<string, string>,
  version?: string
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest
const componentsDir = resolve(__dirname, 'components')

const outDir = process.env.OUT_DIR || 'dist'
const format = (process.env.FORMAT || 'es') as LibraryFormats
const logLevel = process.env.LOG_LEVEL
const sourceMap = process.env.SOURCE_MAP === 'true'

const prePlugins = (plugins: Plugin[]): Plugin[] => {
  return plugins.map(plugin => ({ ...plugin, enforce: 'pre', apply: 'build' }))
}

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

export default defineConfig(async () => {
  const input = await glob('components/**/*.{ts,vue}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
    ignore: ['**/__serve__/**']
  })

  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    resolve: {
      alias: [
        { find: /^@\/components/, replacement: resolve(__dirname, 'components') },
        { find: /^@\/common\/icons/, replacement: resolve(__dirname, 'common/icons/src') },
        { find: '@vexip-ui/config', replacement: resolve(__dirname, 'common/config/src') }
      ]
    },
    build: {
      outDir,
      sourcemap: sourceMap,
      lib: {
        entry: resolve(componentsDir, 'index.ts'),
        formats: [format]
      },
      rollupOptions: {
        input,
        external,
        output: {
          preserveModules: true,
          preserveModulesRoot: componentsDir,
          entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`
        },
        treeshake: false
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 10000
    },
    plugins: [
      ...prePlugins([
        {
          name: 'vexip-ui:resolve',
          resolveId(id) {
            if (id.startsWith('@/style')) {
              return {
                id: id.replace(/@\/style\/(.+).scss$/, 'vexip-ui/css/$1.css'),
                external: 'absolute'
              }
            }
            // else if (id.startsWith('@/common/icons')) {
            //   return {
            //     id: id.replace(/^@\/common\/icons/, 'vexip-ui/icons'),
            //     external: 'absolute'
            //   }
            // }
          }
        }
      ]),
      vue(),
      vueJsx(),
      dts({
        exclude: [
          'node_modules',
          'playground',
          'common/icons',
          'common/mixins',
          'common/utils',
          'components/*/__serve__'
        ],
        compilerOptions: { sourceMap },
        copyDtsFiles: false
      })
    ]
  }
})
