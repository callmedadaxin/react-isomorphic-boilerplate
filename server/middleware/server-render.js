import ReactServerRender from 'react-dom/server'

import entry from '@/server-entry'
import createStore from '@/store'

const { renderToString } = ReactServerRender

export default async (ctx, next) => {
  const context = {}
  const store = createStore()
  const App = await entry(ctx.url, context, store)
  if (context.url) {
    return
  }

  await ctx.render('index', {
    title: 'title',
    root: renderToString(App),
    state: store.getState()
  })

  next()
}