var path = require('path')
var config = require('../config')
var build = require('./build')
var webpackConfig = require('./webpack.server.conf')

var assetsPath = path.join(config.server.assetsRoot, config.server.assetsSubDirectory)

build(webpackConfig, assetsPath)