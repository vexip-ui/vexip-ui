import { dirname, resolve } from 'node:path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import autoprefixer from 'autoprefixer'
import discardCss from 'postcss-discard-duplicates'
import inspect from 'vite-plugin-inspect'
import { demoImports } from './.vitepress/build/plugins/demo-imports'

import type { ConfigEnv, UserConfigExport } from 'vite'

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(({ command }: ConfigEnv): any => {
  const isServe = command === 'serve'
  const metaPath = resolve(__dirname, '../meta-data/contributors.json')

  if (isServe && !existsSync(metaPath)) {
    mkdirSync(dirname(metaPath))
    writeFileSync(metaPath, '{}\n', 'utf-8')
  }

  return <UserConfigExport>{
    define: {
      // __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
      __ROLLBACK_LANG__: JSON.stringify('zh-CN'),
      __VERSION__: JSON.stringify(pkg.version || ''),
    },
    resolve: {
      alias: [
        { find: /^@docs\/(.+)/, replacement: resolve(__dirname, '$1') },
        {
          find: /^@vp\/(.+)/,
          replacement: resolve(__dirname, '.vitepress/$1'),
        },
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
        {
          find: /^@vexip-ui\/(bem-helper|utils|hooks|config)/,
          replacement: resolve(__dirname, '../common/$1/src'),
        },
        { find: /^vexip-ui$/, replacement: resolve(__dirname, '../index.ts') },
      ],
      dedupe: isServe ? ['../components', 'vue'] : ['vue'],
    },
    optimizeDeps: {
      include: [
        '@vexip-ui/icons',
        ...Object.keys(pkg.dependencies).filter((dep: string) => !dep.includes('vexip-ui')),
      ],
    },
    esbuild: {
      drop: isServe ? undefined : ['debugger'],
      pure: isServe ? undefined : ['console.log'],
    },
    server: {
      port: 9000,
      host: '0.0.0.0',
    },
    build: {
      // sourcemap: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 10 * 1024,
    },
    ssr: {
      noExternal: ['vue-i18n', 'prismjs'],
    },
    css: {
      postcss: {
        plugins: [autoprefixer, ...(isServe ? [] : [discardCss])],
      },
    },
    plugins: [
      vueJsx(),
      i18n({ include: resolve(__dirname, './vitepress/i18n') }),
      inspect(),
      demoImports(),
    ],
  }
})
