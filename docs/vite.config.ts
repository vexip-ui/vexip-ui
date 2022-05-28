import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import discardCss from 'postcss-discard-duplicates'
import markdown from 'vite-plugin-md'
import { highlight } from './build/highlight'
import { markdownItSetup } from './build/markdown'

const language = 'zh-CN'

export default defineConfig(({ command }) => {
  const useServer = command === 'serve'

  return {
    define: {
      __LANGUAGE__: JSON.stringify(language)
    },
    resolve: {
      alias: [{ find: /^@docs\/(.+)/, replacement: resolve(__dirname, '$1') }],
      dedupe: ['vue', 'vexip-ui']
    },
    server: {
      port: 9000,
      host: '0.0.0.0',
      fs: {
        allow: ['..']
      }
    },
    build: {
      chunkSizeWarningLimit: 10 * 1024
    },
    css: {
      postcss: {
        plugins: useServer ? [] : [discardCss as any]
      }
    },
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      markdown({
        markdownItOptions: {
          typographer: false,
          highlight
        },
        markdownItSetup,
        // wrapperClasses: 'markdown',
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
