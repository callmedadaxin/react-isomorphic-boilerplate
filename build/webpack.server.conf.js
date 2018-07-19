const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const config = require('../config')

const resolve = dir => path.join(__dirname, '..', dir)
const getExternals = () => {
  return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}

module.exports = {
  mode: 'production',
  entry: config.server.entry,
  output: {
    path: config.build.assetsRoot,
    filename: utils.serverPath('[name].js')
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
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: [resolve('node_modules')]
      }
    ]
  }
}
