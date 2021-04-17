import { resolve } from 'path'
import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import eslint from '@rollup/plugin-eslint'
import stylelint from 'rollup-plugin-stylelint'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const prePlugins = plugins => {
  return plugins.map(plugin => ({ ...plugin, enforce: 'pre' }))
}

export default defineConfig(
  ({ command }) => {
    return {
      publicDir: '',
      resolve: {
        alias: [
          { find: /^@\/(.+)/, replacement: resolve(__dirname, 'src/$1') },
          { find: /^@style\/(.+)/, replacement: resolve(__dirname, 'src/style/$1') }
        ]
      },
      define: {
        'process.env.VERSION': JSON.stringify(pkg.version)
      },
      server: {
        force: true
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VexipUI',
          filename: 'vexip-ui',
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            exports: 'named',
            globals: {
              vue: 'Vue'
            }
          }
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import '@style/basis/variable.scss';\n`
          }
        }
      },
      plugins: [
        ...prePlugins([
          stylelint({
            throwOnError: true,
            throwOnWarning: true,
            include: [resolve(__dirname, 'src/**')]
          }),
          eslint({
            throwOnError: true,
            throwOnWarning: true,
            include: [resolve(__dirname, 'src/**')]
          })
        ]),
        createVuePlugin()
      ]
    }
  }
)
