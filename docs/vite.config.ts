import { resolve } from 'node:path'
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import autoprefixer from 'autoprefixer'
import discardCss from 'postcss-discard-duplicates'
import markdown from 'vite-plugin-vue-markdown'
import { cyan, green, red } from 'kolorist'
import { highlight } from './build/highlight'
import { markdownItSetup } from './build/markdown'

import type { Plugin, Logger } from 'vite'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(({ command }) => {
  const useServer = command === 'serve'

  return {
    define: {
      __SSR__: JSON.stringify(process.env.SSR === 'true'),
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
              { find: /^vexip-ui$/, replacement: resolve(__dirname, '..') }
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
        plugins: [autoprefixer, ...(useServer ? [] : [discardCss])]
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
      {
        name: 'single-hmr',
        apply: 'serve',
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
      },
      {
        name: 'provide-meta',
        apply: 'build',
        transformIndexHtml() {
          const metaAttrs = [
            { 'http-equiv': 'Expires', content: '0' },
            { 'http-equiv': 'Pragma', content: 'no-cache' },
            { 'http-equiv': 'Cache', content: 'no-cache' },
            { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' }
          ]

          return metaAttrs.map(attrs => ({ tag: 'meta', attrs }))
        }
      },
      createZipPlugin()
    ]
  }
})

function createZipPlugin(): Plugin {
  const logPrefix = cyan('[vite:zip]')

  let logger: Logger
  let outDir = 'dist'
  let root = __dirname

  function zipFolder(zip: import('jszip'), root: string) {
    readdirSync(root).forEach(f => {
      const path = resolve(root, f)

      if (statSync(path).isDirectory()) {
        zipFolder(zip.folder(f)!, path)
      } else {
        zip.file(f, readFileSync(path))
      }
    })
  }

  return {
    name: 'vite:zip',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      logger = config.logger
      outDir = config.build.outDir
      root = config.root
    },
    async closeBundle() {
      const dir = resolve(root, outDir)

      if (!existsSync(dir)) {
        logger.error(red(`\n${logPrefix} cannot file outDir '${dir}'`))
        return
      }

      logger.info(green(`\n${logPrefix} zipping outDir...`))

      try {
        const { default: JSZip } = await import('jszip')
        const zip = new JSZip()

        zipFolder(zip, dir)
        writeFileSync(
          resolve(dir, `${outDir}.zip`),
          await zip.generateAsync({ type: 'nodebuffer' }),
          'utf-8'
        )

        logger.info(green(`${logPrefix} zip successful\n`))
      } catch (error) {
        logger.error(red(`${logPrefix} zip fail with something wrong\n`))
        logger.error(error as string)
      }
    }
  }
}
