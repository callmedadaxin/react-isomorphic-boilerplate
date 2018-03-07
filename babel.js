require('babel-polyfill')

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['add-module-exports'],
  ignore: /node_modules\/(?!koa-webpack-dev-middleware|koa-webpack-hot-middleware)/
})