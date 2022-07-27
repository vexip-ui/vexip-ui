import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/*.spec.{ts,tsx}'],
    environment: 'happy-dom',
    clearMocks: true,
    transformMode: {
      web: [/\.[jt]s$/]
    }
  }
})
