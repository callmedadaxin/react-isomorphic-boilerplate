import ReactServerRender from 'react-dom/server'
import { getBundles } from 'react-loadable/webpack';

import entry from '@/server-entry'
import createStore from '@/store'

const { renderToString } = ReactServerRender

// function generateBundleScripts (bundles) {
//   const bundles = getBundles(stats, modules)
//   return bundles
//     .filter(bundle => bundle && bundle.file.endsWith('.js'))
//     .map(bundle => {
//       return `<script type="text/javascript" src="${__pathPrefix__}${
//         bundle.file
//       }"></script>\n`;
//     });
// }

export default async (ctx, next) => {
  const context = {}
  const store = createStore()
  const App = await entry(ctx.url, context, store)
  const modules = []
  if (context.url) {
    return
  }
  const Root = <Loadable.Capture report={moduleName => modules.push(moduleName)}>
    <App />
  </Loadable.Capture>

  console.log(modules)

  await ctx.render('index', {
    title: 'title',
    root: renderToString(Root),
    state: store.getState()
  })

  next()
}