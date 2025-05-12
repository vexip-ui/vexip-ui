import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'

const upstreamPkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const getVersion = (name: string) => {
  const [dep] = [pkg, upstreamPkg]
    .map(pkg => pkg.dependencies[name] || pkg.devDependencies[name])
    .filter(Boolean)

  return dep && (/^\d/.test(dep) ? dep : dep.slice(1))
}

export default defineConfig(({ command }) => {
  const useServer = command === 'serve'

  return {
    define: {
      __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
      __VERSION__: JSON.stringify(upstreamPkg.version),
      __VUE_VERSION__: JSON.stringify(getVersion('vue')),
      __TS_VERSION__: JSON.stringify(getVersion('typescript')),
      __REPL_VERSION__: JSON.stringify(getVersion('@vue/repl')),
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../$1') },
        { find: /^vexip-ui$/, replacement: resolve(__dirname, '../components') },
        { find: /^vexip-ui\/(.+)/, replacement: resolve(__dirname, '../$1') },
        {
          find: /^@vexip-ui\/(bem-helper|utils|hooks|config)/,
          replacement: resolve(__dirname, '../common/$1/src'),
        },
      ],
      dedupe: useServer ? ['../components', 'vue'] : ['vue', 'vexip-ui'],
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log'],
    },
    server: {
      port: 6012,
      fs: {
        allow: ['..'],
      },
    },
    build: {
      chunkSizeWarningLimit: 10 * 1024,
    },
    optimizeDeps: {
      force: true,
      include: [
        '../components',
        '@vexip-ui/bem-helper',
        '@vexip-ui/hooks',
        '@vexip-ui/icons',
        '@vexip-ui/utils',
      ],
      exclude: ['@vue/repl', 'vue/server-renderer'],
    },
    preview: {
      port: 6012,
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      {
        name: 'provide-meta',
        apply: 'build',
        transformIndexHtml() {
          const metaAttrs = [
            { 'http-equiv': 'Expires', content: '0' },
            { 'http-equiv': 'Pragma', content: 'no-cache' },
            { 'http-equiv': 'Cache', content: 'no-cache' },
            { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' },
          ]

          return metaAttrs.map(attrs => ({ tag: 'meta', attrs }))
        },
      },
    ],
  }
})
