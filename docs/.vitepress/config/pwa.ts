import minimist from 'minimist'
import { SITE_DESC, SITE_NAME } from './constant'

import type { PwaOptions } from '@vite-pwa/vitepress'

const args = minimist<{ pwa?: boolean }>(process.argv.slice(2))
const devPaw = args._[0] === 'dev' && args.pwa

export const getPwaConfig: Partial<PwaOptions> = {
  outDir: '.vitepress/dist',
  registerType: 'prompt',
  base: '/',
  scope: '/',
  manifest: {
    id: '/',
    start_url: '/',
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESC,
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
    enabled: devPaw,
    suppressWarnings: true,
    navigateFallback: '/'
  }
}
