// node babel support
require('../babel')
require('../require-hook')
const config = require('../config')
const opn = require('opn')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
// const webpackConfig = require('./dev')
const convert = require('koa-convert')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const views = require('koa-views')
const static = require('koa-static')
const app = require('../server/app')
const fs = require('fs')
// const Loadable = require('react-loadable')
// const ssrMiddleWare = require('../server/middleware/server-render')
//for .babelrc
process.env.BABEL_ENV = "dev"

const port = process.env.PORT || config.dev.port

const autoOpenBrowser = !!config.dev.autoOpenBrowser

const proxyTable = config.dev.proxyTable

const compiler = webpack(webpackConfig)

compiler.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets
  let file, data

  Object.keys(assets).forEach(key => {
    if (key.match(/\.ejs$/)) {
      file = path.resolve(__dirname, '../views/', key)
      data = assets[key].source()

      fs.writeFileSync(file, data)
    }
  })
  callback()
})
app.use(views(path.join(__dirname, '../views'), { extension: 'ejs' }))

app.use(convert(devMiddleware(compiler, {
  noInfo: true
})))
app.use(convert(hotMiddleware(compiler)))
// app.use(ssrMiddleWare)

app.use(async (ctx, next) => {
  await ctx.render('index', {
    title: 'title',
    root: '',
    state: {},
    scripts: []
  })
  next()
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   let options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

const uri = 'http://localhost:' + port

console.log('> Starting dev server...')

// Loadable.preloadAll().then(_ => {
app.listen(port, () => {
  console.log('> Listening at ' + uri + '\n')
})
// })
