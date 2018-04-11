var path = require('path')
var config = require('../config')
var build = require('./build')
var webpackConfig = require('./webpack.prod.conf')

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

build(webpackConfig, assetsPath)