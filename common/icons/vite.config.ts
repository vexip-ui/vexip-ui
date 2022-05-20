import { resolve } from 'path'
import { defineConfig } from 'vite'
import glob from 'fast-glob'

import type { LibraryFormats } from 'vite'

const outDir = process.env.OUT_DIR || 'dist'
const format = (process.env.FORMAT || 'es') as LibraryFormats

export default defineConfig(async () => {
  const input = await glob('src/**/*.ts', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
    ignore: ['**/__serve__/**']
  })

  return {
    build: {
      outDir,
      sourcemap: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: [format]
      },
      
      rollupOptions: {
        input,
        external: ['vue', '@vue'],
        output: {
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, 'src'),
          entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`
        }
      },
      commonjsOptions: {
        sourceMap: false
      }
    }
  }
})
