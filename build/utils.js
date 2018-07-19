const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const fs = require('fs')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
exports.serverPath = function (_path) {
  var assetsSubDirectory = config.server.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.getDllPath = function (p) {
  const basePath = path.resolve(__dirname, p)
  const dir = fs.readdirSync(basePath)
  const dllPath = dir.filter(item => item.indexOf('.js') >= 0)[0]
  return path.join(basePath, dllPath)
}

exports.cssLoaders = function (options) {
  options = options || {}
  let prod = process.env.NODE_ENV === 'production'
  var cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // MiniCssExtractPlugin 替代ExtractTextPlugin
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
