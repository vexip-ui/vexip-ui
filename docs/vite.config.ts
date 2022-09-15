import { resolve } from 'path'
import { readFileSync } from 'fs'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18n from '@intlify/vite-plugin-vue-i18n'
import discardCss from 'postcss-discard-duplicates'
import markdown from 'vite-plugin-md'
import { highlight } from './build/highlight'
import { markdownItSetup } from './build/markdown'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(({ command }) => {
  const useServer = command === 'serve'

  return {
    define: {
      __ROLLBACK_LANG__: JSON.stringify('zh-CN'),
      __VERSION__: JSON.stringify(pkg.version || '')
    },
    resolve: {
      alias: [
        { find: /^@docs\/(.+)/, replacement: resolve(__dirname, '$1') },
        ...(useServer
          ? [
              { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
              {
                find: /^@vexip-ui\/((?!icons).+)/,
                replacement: resolve(__dirname, '../common/$1/src')
              },
              // {
              //   find: /^vexip-ui\/(es|lib)\/(.+)/,
              //   replacement: resolve(__dirname, '../components/$2')
              // },
              { find: /^vexip-ui$/, replacement: resolve(__dirname, '../components') }
            ]
          : [])
      ],
      dedupe: useServer ? ['../components', 'vue'] : ['vue']
    },
    server: {
      port: 9000,
      host: '0.0.0.0',
      fs: {
        allow: ['..']
      }
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 10 * 1024
    },
    css: {
      postcss: {
        plugins: useServer ? [] : [discardCss as any]
      }
    },
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      vueJsx(),
      splitVendorChunkPlugin(),
      i18n({
        compositionOnly: false,
        include: resolve(__dirname, 'i18n')
      }),
      markdown({
        markdownItOptions: {
          typographer: false,
          highlight
        },
        markdownItSetup,
        wrapperComponent: 'Markdown'
      }),
      useServer && {
        name: 'single-hmr',
        handleHotUpdate({ modules, file }) {
          if (file.match(/xml$/)) return []

          modules.forEach(m => {
            if (!m.url.match(/\.(s|p)?css/)) {
              m.importedModules = new Set()
              m.importers = new Set()
            }
          })

          return modules
        }
      }
    ]
  }
})
