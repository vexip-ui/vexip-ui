import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es'],
      fileName: f => `index.${f === 'es' ? '' : 'm'}js`
    }
  },
  plugins: [dts({ rollupTypes: true })]
})
