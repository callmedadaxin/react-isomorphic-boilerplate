import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = await ctx.render('index', {
    title: 'test'
  })
})

export default router