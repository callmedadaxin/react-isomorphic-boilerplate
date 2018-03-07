/* webpack --config  webpack.dll.config.js --progress */

const path = require('path');
const webpack = require('webpack');
const lib = require('../config/lib.dependencies');

const outputPath = path.join(__dirname, './dll');

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]',
    context: __dirname,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify("production")
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$', 'exports', 'require']
    },
    exclude: /\.min\.js$/,
    // mangle:true,
    compress: { warnings: false },
    output: { comments: false }
  })
];

module.exports = {
  devtool: 'source-map',
  entry: {
    lib: lib
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]'
  },
  plugins: plugin
};
