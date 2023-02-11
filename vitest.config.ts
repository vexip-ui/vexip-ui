import { resolve } from 'node:path'
import { readdirSync, statSync } from 'node:fs'
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
  optimizeDeps: {
    include: ['@vexip-ui/utils', '@vexip-ui/hooks', '@vexip-ui/icons']
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
    },
    testTimeout: 10000
  },
  plugins: [vue(), vueJsx()]
})
