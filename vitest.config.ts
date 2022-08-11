import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
    }
  },
  plugins: [vue(), vueJsx()]
})
