import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const dirs = readdirSync(__dirname).filter(f => statSync(resolve(f)).isDirectory())

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') },
      { find: '@vexip-ui/config', replacement: resolve(__dirname, 'common/config/src') }
    ]
  },
  test: {
    include: ['components/*/tests/*.spec.{ts,tsx}'],
    environment: 'happy-dom',
    clearMocks: true,
    setupFiles: [resolve(__dirname, 'scripts/test-setup.ts')],
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    coverage: {
      exclude: dirs.filter(f => f !== 'components').map(f => `${f}/**`),
      reporter: ['text'],
      extension: ['ts', 'tsx', 'vue']
    }
  },
  plugins: [vue(), vueJsx()]
})
