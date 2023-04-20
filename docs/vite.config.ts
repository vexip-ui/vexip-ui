import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { docDir, rootDir } from './utils'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import autoprefixer from 'autoprefixer'
import discardCss from 'postcss-discard-duplicates'

const pkg = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))

export default defineConfig(({ mode }) => {
  const useServer = mode === 'development'

  return {
    define: {
      __SSR__: JSON.stringify(process.env.SSR === 'true'),
      __ROLLBACK_LANG__: JSON.stringify('zh-CN'),
      __VERSION__: JSON.stringify(pkg.version || '')
    },
    resolve: {
      alias: [
        { find: /^@docs\/(.+)/, replacement: resolve(docDir, '$1') },
        ...(useServer
          ? [
              { find: /^@\/(.+)/, replacement: resolve(docDir, '../$1') },
              {
                find: /^@vexip-ui\/((?!icons).+)/,
                replacement: resolve(docDir, '../common/$1/src')
              },
              { find: /^vexip-ui$/, replacement: resolve(docDir, '../index.ts') }
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
        include: resolve(docDir, 'i18n')
      })
    ]
  }
})
