import views from 'koa-views'
import serve from 'koa-static'
import path from 'path'

import config from './config'
import app from './app'
import ssrMiddleWare from './middleware/server-render'

const resolve = p => path.resolve(__dirname, p)
const staticRoot = resolve('../dist')

app.use(views(staticRoot, { map: { html: 'ejs' } }))
app.use(serve(staticRoot))

app.use(ssrMiddleWare)

const { port } = config

const uri = 'http://localhost:' + port

app.listen(port, () => {
  console.log('> Listening at ' + uri + '\n')
})