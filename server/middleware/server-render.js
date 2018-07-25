import ReactServerRender from 'react-dom/server'
import { getBundles } from 'react-loadable/webpack'

import entry from '@/server-entry'
import createStore from '@/store'
import config from '../../config/index'

const path = require('path')
const fs = require('fs')
const { renderToString } = ReactServerRender
const statsPath = path.join(config.build.assetsRoot, 'react-loadable.json')
const staticPath = config.build.assetsSubDirectory
const statsStr = fs.readFileSync(statsPath, 'utf8')
const stats = JSON.parse(statsStr)

function generateBundleScripts (modules) {
  const bundles = getBundles(stats, modules)
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