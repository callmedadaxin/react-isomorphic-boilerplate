const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const path = require('path')
// const fs = require('fs')

baseWebpackConfig.entry.bundle = [
  'webpack-hot-middleware/client?noInfo=true&reload=true'
]

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('../dll/manifest.json')
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: 'index.html',
      inject: true
    }),
    // new AddAssetHtmlPlugin([{
    //   filepath: utils.getDllPath('../dll'),
    //   hash: false,
    //   includeSourcemap: false
    // }]),
    new FriendlyErrorsPlugin(),
  ]
})
