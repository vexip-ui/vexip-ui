import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external
    }
  },
  plugins: [dts({ rollupTypes: true })]
})
