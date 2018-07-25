var path = require('path')
var config = require('../config')
var build = require('./build')
var webpackConfig = require('./webpack.server.conf')

var assetsPath = path.join(config.server.assetsRoot, config.server.assetsSubDirectory)
//for .babelrc
process.env.BABEL_ENV = "ssr"

build(webpackConfig, assetsPath)