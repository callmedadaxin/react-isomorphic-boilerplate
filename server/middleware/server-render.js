import ReactServerRender from 'react-dom/server'
import { getBundles } from 'react-loadable/webpack'

import entry from '@/server-entry'
import createStore from '@/store'
import config from '../../config/index'

const stats = require('../../dist/react-loadable.json')
const path = require('path')
const { renderToString } = ReactServerRender
// const statsPath = path.join(config.build.assetsRoot, 'react-loadable.json')
const staticPath = config.build.assetsSubDirectory
// const stats = require(path.relative(__dirname, statsPath))

function generateBundleScripts (modules) {
  const bundles = getBundles(stats, modules)
  console.log(stats, staticPath)
  return bundles
    .filter(bundle => bundle && bundle.file.endsWith('.js'))
    .map(bundle => {
      return `<script type="text/javascript" src="/${staticPath}${
        bundle.file
      }"></script>\n`;
    });
}

export default async (ctx, next) => {
  const context = {}
  const store = createStore()
  const modules = []
  const app = await entry(ctx.url, context, store, modules)
  if (context.url) {
    return
  }
  console.log(app.modules)
  console.log(generateBundleScripts(app.modules))

  await ctx.render('index', {
    title: 'title',
    root: renderToString(app.html),
    state: store.getState()
  })

  next()
}