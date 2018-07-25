const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => path.join(__dirname, '..', dir)
const getExternals = () => {
  return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: config.server.entry,
  output: {
    path: config.build.assetsRoot,
    filename: utils.serverPath('[name].js')
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      }),
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve('client'),
      resolve('server'),
      resolve('node_modules')
    ],
    alias: {
      '@': resolve('client'),
      'server': resolve('server')
    }
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: getExternals(),
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].css'),
      chunkFilename: utils.assetsPath('css/[contenthash:12].css')
    }),
  ]
})
