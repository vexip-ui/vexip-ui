import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import styles from 'rollup-plugin-styles'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: {
    file: path.resolve(__dirname, 'types/index.js'),
    format: 'es',
    sourcemap: false,
    externalLiveBindings: false
  },
  external: ['vue'],
  plugins: [
    alias({
      entries: [
        { find: /^@\/(.+)/, replacement: path.resolve(__dirname, './src/$1') }
      ]
    }),
    nodeResolve({
      preferBuiltins: true,
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    }),
    commonjs({ sourceMap: false }),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VUE_ENV': JSON.stringify('browser')
      },
      preventAssignment: true
    }),
    vue({
      needMap: false
      // include: ['**/*.js', '**/*.ts', '**/*.vue']
    }),
    styles({
      mode: 'extract',
      onExtract: () => false
    }),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          sourceMap: false
        },
        exclude: ['**/__tests__']
      }
    })
  ]
}
