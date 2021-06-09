import { resolve, basename, relative, dirname } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { injectHtml } from 'vite-plugin-html'
import eslint from '@rollup/plugin-eslint'
import pcssEnv from 'postcss-preset-env'
import discardCss from 'postcss-discard-duplicates'

if (!process.env.TARGET && process.env.ENV === 'development') {
  throw new Error('Target component must be specified.')
}

const componentsDir = resolve(__dirname, 'components')
const componentDir = resolve(componentsDir, process.env.TARGET || '..')
const name = basename(componentDir)

const componentResolve = (p: string) => resolve(componentDir, p)

const isProduction = process.env.NODE_ENV === 'production'
const sourceMap = process.env.SOURCE_MAP === 'true'

const prePlugins = plugins => {
  return plugins.map(plugin => ({ ...plugin, enforce: 'pre', apply: 'build' }))
}

const toPascalCase = (str: string) =>
  str.charAt(0).toUpperCase() +
  str.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))

export default defineConfig(({ command }) => {
  const useServer = command === 'serve'

  return {
    resolve: {
      alias: [{ find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') }]
    },
    server: {
      port: parseInt(process.env.PORT) || 8000
    },
    build: {
      sourcemap: sourceMap,
      outDir: process.env.TARGET ? `lib/${name}` : 'dist',
      lib: process.env.TARGET
        ? {
            entry: componentResolve('index.ts'),
            name: toPascalCase(name),
            formats: ['es'],
            fileName: 'index'
          }
        : {
            entry: resolve(componentsDir, 'index.ts'),
            name: 'VexipUI',
            formats: ['es', 'cjs'],
            fileName: 'vexip-ui'
          },
      rollupOptions: {
        external: !process.env.TARGET
          ? ['vue']
          : id => {
            return (
              /^vue/.test(id) || /^@\/components\//.test(id) || /^@\/common\/icons\//.test(id)
            )
          },
        output: {
          globals: {
            vue: 'Vue'
          },
          paths: !process.env.TARGET
            ? undefined
            : id => {
              if (/^@\/components\//.test(id)) {
                return id.replace(/@\/components/, '..')
              } else if (/^@\/common\/icons\//.test(id)) {
                return id.replace(/@\/common\/icons/, '../../icons')
              }
            }
        }
      },
      terserOptions: {
        compress: {
          ecma: 2015,
          drop_console: isProduction
        }
      },
      commonjsOptions: {
        sourceMap: false
      },
      emptyOutDir: !process.env.TARGET,
      chunkSizeWarningLimit: 10000
    },
    css: {
      postcss: {
        plugins: [pcssEnv].concat(useServer ? [] : [discardCss])
      },
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@use "sass:math";',
            '@import "@/design/variables.scss";',
            '@import "@/design/mixins.scss";'
          ].join('\n')
        }
      }
    },
    plugins: [
      ...prePlugins([
        eslint({
          throwOnError: true,
          throwOnWarning: true,
          fix: isProduction,
          include: ['components/**/*.ts', 'components/**/*.vue']
        })
      ]),
      vue(),
      vueJsx(),
      !process.env.TARGET &&
        dts({
          exclude: ['node_modules', 'common/icons'],
          outputDir: 'lib',
          beforeWriteFile(filePath, content) {
            const libDir = resolve(__dirname, 'lib')

            filePath = filePath.includes('common')
              ? filePath
              : resolve(libDir, relative(resolve(libDir, 'components'), filePath))

            const relativeToLib = relative(dirname(filePath), libDir).replace(/[\\/]+/g, '/') || '.'

            content = content
              .replace(/['"]\.\.\/\.\.\/common(.*)['"]/g, `'${relativeToLib}/common$1'`)
              .replace(/['"]\.\.\/common(.*)['"]/g, `'${relativeToLib}/common$1'`)
              .replace(/['"]\.\.\/\.\.\/components(.*)['"]/g, `'${relativeToLib}$1'`)
              .replace(/['"]\.\.\/components(.*)['"]/g, `'${relativeToLib}$1'`)

            return { filePath, content }
          }
        }),
      injectHtml({
        injectData: { name }
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
