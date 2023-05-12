import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import autoprefixer from 'autoprefixer'
import discardCss from 'postcss-discard-duplicates'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(({ command }: ConfigEnv): any => {
  const isServe = command === 'serve'

  return <UserConfigExport>{
    define: {
      __ROLLBACK_LANG__: JSON.stringify('zh-CN'),
      __VERSION__: JSON.stringify(pkg.version || '')
    },
    resolve: {
      alias: [
        { find: /^@docs\/(.+)/, replacement: resolve(__dirname, '$1') },
        ...(isServe
          ? [
              { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
              {
                find: /^@vexip-ui\/(utils|hooks|config)/,
                replacement: resolve(__dirname, '../common/$1/src')
              },
              { find: /^vexip-ui$/, replacement: resolve(__dirname, '../index.ts') }
            ]
          : [])
      ],
      dedupe: isServe ? ['../components', 'vue'] : ['vue']
    },
    optimizeDeps: {
      include: ['@vexip-ui/icons']
    },
    esbuild: {
      drop: isServe ? undefined : ['debugger'],
      pure: isServe ? undefined : ['console.log']
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
        plugins: [autoprefixer, ...(isServe ? [] : [discardCss])]
      }
    },
    plugins: [
      vueJsx(),
      splitVendorChunkPlugin(),
      i18n({
        compositionOnly: false,
        include: resolve(__dirname, 'i18n')
      })
    ]
  }
})
