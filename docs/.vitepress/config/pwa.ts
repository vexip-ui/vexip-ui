import type { PwaOptions } from '@vite-pwa/vitepress'

export const getPwaConfig: Partial<PwaOptions> = {
  outDir: '.vitepress/dist',
  registerType: 'prompt',
  base: '/',
  scope: '/',
  manifest: {
    id: '/',
    start_url: '/',
    name: 'Vexip UI',
    short_name: 'Vexip UI',
    description:
      'A Vue 3 UI library, highly customizability, full TypeScript, performance pretty good.',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}']
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallback: '/'
  }
}
