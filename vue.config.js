'use strict'

const packageJson = require('./package.json')

const StylelintPlugin = require('stylelint-webpack-plugin')
const styleVariable = require('./src/style/basis/variable')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pages: {
    index: {
      entry: 'tests/dev/main.ts'
    }
  },
  configureWebpack: {
    output: {
      library: 'VexipUI',
      libraryExport: 'default'
    }
  },
  chainWebpack(config) {
    config
      .plugin('stylelint')
      .use(StylelintPlugin)

    config
      .plugin('define')
      .tap(args => {
        args[0]['process.env'].VERSION = `'${packageJson.version}'`

        return args
      })

    config.devServer.port(8008)
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: Object.keys(styleVariable)
          .map(key => `$${key}: ${styleVariable[key]};`)
          .join('\n')
      }
    }
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
}
