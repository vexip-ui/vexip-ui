// This config is for building library, do not use to create serve.

import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import MagicString from 'magic-string'
import { components } from './scripts/utils'

import type { LogLevel, Plugin } from 'vite'

interface Manifest {
  dependencies?: Record<string, string>,
  peerDependencies?: Record<string, string>,
  version?: string
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest
const logLevel = process.env.LOG_LEVEL

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

export default defineConfig(async () => {
  const input = await glob('components/**/*.{ts,vue}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true
  })

  input.push(resolve(__dirname, 'index.ts'))

  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    resolve: {
      alias: [
        { find: /^@\/components/, replacement: resolve(__dirname, 'components') },
        { find: /^@\/directives/, replacement: resolve(__dirname, 'directives') },
        { find: '@vexip-ui/config', replacement: resolve(__dirname, 'common/config/src') }
      ]
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log']
    },
    build: {
      outDir: 'es',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        name: 'VexipUI'
      },
      rollupOptions: {
        input,
        external,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'lib',
            entryFileNames: '[name].cjs'
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'es',
            entryFileNames: '[name].mjs'
          }
        ],
        treeshake: false
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 10000
    },
    plugins: [createResolvePlugin(), vue(), vueJsx()]
  }
})

function createResolvePlugin(): Plugin {
  const files = new Set([...components, 'preset', 'dark'])
  const rootRE = /vexip-ui\//g

  return {
    name: 'vexip-ui:resolve',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith('@/style')) {
        return {
          id: id.replace(/@\/style\/(.+).scss$/, 'vexip-ui/style/$1.scss'),
          external: 'absolute'
        }
      }

      if (id.startsWith('@/css')) {
        return {
          id: id.replace(/@\/css\/(.+).css$/, 'vexip-ui/css/$1.css'),
          external: 'absolute'
        }
      }
    },
    buildStart() {
      for (const name of files) {
        this.emitFile({
          type: 'chunk',
          id: resolve('components', name, 'style.ts'),
          name: `style/${name}`
        })
        this.emitFile({
          type: 'chunk',
          id: resolve('components', name, 'css.ts'),
          name: `css/${name}`
        })
      }
    },
    renderChunk(code, chunk) {
      if (
        files.has(chunk.name.substring('style/'.length)) ||
        files.has(chunk.name.substring('css/'.length))
      ) {
        code = code.replace(rootRE, '../../')

        return {
          code,
          map: new MagicString(code).generateMap()
        }
      }
    }
  }
}
