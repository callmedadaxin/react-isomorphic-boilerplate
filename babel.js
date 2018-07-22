require('babel-polyfill')
const fs = require('fs')
const babelrc = fs.readFileSync('./.babelrc', 'utf8')

//@see https://www.npmjs.com/package/babel-plugin-module-alias
const alias = require('./build/webpack.base.conf').resolve.alias
const retAlias = Object.keys(alias).map(key => {
  return {
    src: alias[key],
    expose: key
  }
})

console.log(babelrc)
const getBabelConfig = () => {
  try {
    const config = JSON.parse(babelrc.toString())
    config.plugins.push([
      "module-alias",
      retAlias
    ],)
    config.plugins.push("dynamic-import-node")
    config.ignore = /node_modules\/(?!koa-webpack-dev-middleware|koa-webpack-hot-middleware)/
    return config
  } catch (error) {
    console.log(error)
    return {}
  }
}
// Javascript require hook
require('babel-register')(getBabelConfig())