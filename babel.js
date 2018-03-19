require('babel-polyfill')

//@see https://www.npmjs.com/package/babel-plugin-module-alias
const alias = require('./build/webpack.base.conf').resolve.alias
const retAlias = Object.keys(alias).map(key => {
  return {
    src: alias[key],
    expose: key
  }
})

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: [
    'add-module-exports',
    "transform-decorators-legacy",
    [
    "module-alias",
    retAlias
    ],
  ],
  ignore: /node_modules\/(?!koa-webpack-dev-middleware|koa-webpack-hot-middleware)/
})