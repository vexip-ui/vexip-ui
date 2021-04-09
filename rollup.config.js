import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import scss from 'rollup-plugin-scss'
// import commonjs from '@rollup/plugin-commonjs'

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: {
    file: path.resolve(__dirname, 'types/index.js'),
    format: 'es',
    sourcemap: false
  },
  // external: ['vue'],
  plugins: [
    nodeResolve(),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VUE_ENV': JSON.stringify('browser')
      },
      preventAssignment: true
    }),
    vue({
      include: [
        /\.vue$/i,
        /\.js$/i
      ],
      defaultLang: {
        script: 'ts',
        style: 'scss'
      }
    }),
    scss(),
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
