import ReactServerRender from 'react-dom/server'
import entry from '../../client/server-entry'

const { renderToString } = ReactServerRender

export default async (ctx, next) => {
  const context = {}
  const App = entry(ctx.url)

  if (context.url) {
    console.log(1)
    return
  }

  await ctx.render('index', {
    title: 'title',
    root: renderToString(App)
  })

  next()
}