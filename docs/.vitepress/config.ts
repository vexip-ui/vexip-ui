import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { toKebabCase } from '@vexip-ui/utils'
import { splitVendorChunkPlugin } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import autoprefixer from 'autoprefixer'
import discardCss from 'postcss-discard-duplicates'
import zipPlugin from './plugins/zip'
import { highlight } from './build/highlight'
import { markdownItSetup } from './build/markdown'
import { getGuideConfig } from './config/guide'
import { getComponentConfig } from './config/component'

import type { UserConfig } from 'vitepress'

const useServer = process.env.NODE_ENV === 'development'
const docsRoot = resolve(__dirname, '..')

const pkg = JSON.parse(readFileSync(resolve(docsRoot, '../package.json'), 'utf-8'))

export default <UserConfig>{
  vite: {
    define: {
      __SSR__: JSON.stringify(process.env.SSR === 'true'),
      __ROLLBACK_LANG__: JSON.stringify('zh-CN'),
      __VERSION__: JSON.stringify(pkg.version || '')
    },
    resolve: {
      alias: [
        { find: /^@docs\/(.+)/, replacement: resolve(docsRoot, '$1') },
        ...(useServer
          ? [
              { find: /^@\/(.+)/, replacement: resolve(docsRoot, '../$1') },
              {
                find: /^@vexip-ui\/((?!icons).+)/,
                replacement: resolve(docsRoot, '../common/$1/src')
              },
              { find: /^vexip-ui$/, replacement: resolve(docsRoot, '../index.ts') }
            ]
          : [])
      ],
      dedupe: useServer ? ['../components', 'vue'] : ['vue']
    },
    optimizeDeps: {
      include: ['@vexip-ui/icons']
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log']
    },
    server: {
      port: 9000,
      host: '0.0.0.0'
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 10 * 1024
    },
    css: {
      postcss: {
        plugins: [autoprefixer, ...(useServer ? [] : [discardCss])]
      }
    },
    plugins: [
      vueJsx(),
      splitVendorChunkPlugin(),
      i18n({
        compositionOnly: false,
        include: resolve(docsRoot, 'i18n')
      }),
      zipPlugin()
    ]
  },
  head: [
    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['meta', { 'http-equiv': 'Pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vexip-ui.svg' }]
  ],
  titleTemplate: 'Vexip UI',
  lastUpdated: true,
  markdown: {
    // typographer: false,
    highlight,
    config: markdownItSetup
  },
  themeConfig: {
    nav: [
      { key: 'guides', i18n: 'common.guides', link: '/guide/setup' },
      { key: 'components', i18n: 'common.components', link: '/component/button' },
      { key: 'playground', i18n: 'common.playground', to: 'https://playground.vexipui.com' }
    ],
    asideMenus: getAsideMenus(),
    outline: {
      '/guide/': 2,
      '/component/': 3
    }
  },
  locales: {
    'en-US': {
      label: 'en-US',
      lang: 'en-US'
    },
    'zh-CN': {
      label: 'zh-CN',
      lang: 'zh-CN'
    }
  }
}

function getAsideMenus() {
  return {
    '/guide/': getGuideConfig().map(guide => {
      return {
        key: guide.name,
        link: `/guide/${guide.name}`,
        i18n: `guide.${guide.i18n}`
      }
    }),
    '/component/': getComponentConfig().map(group => {
      return {
        key: group.name,
        i18n: `group.${group.name}`,
        count: true,
        items: group.components.map(component => ({
          key: component.name,
          link: `/component/${toKebabCase(component.name)}`,
          i18n: `component.${component.name}`,
          since: component.since,
          orgin: component.name
        }))
      }
    })
  }
}
