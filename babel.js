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

const getBabelConfig = () => {
  try {
    const config = JSON.parse(babelrc.toString())
    config.plugins.push([
      "module-alias",
      retAlias
    ],)
    config.plugins.push("dynamic-import-node")
    return config
  } catch (error) {
    console.log(error)
    return {}
  }
}
require('babel-register')(getBabelConfig())
// Javascript require hook
// require('babel-register')({
//   presets: ['env', 'react', 'stage-1'],
//   plugins: [
//     "transform-decorators-legacy",
//     "react-loadable/babel",
//     'syntax-dynamic-import',
//     "dynamic-import-node",
//     [
//       "module-alias",
//       retAlias
//     ]
//   ]
// })