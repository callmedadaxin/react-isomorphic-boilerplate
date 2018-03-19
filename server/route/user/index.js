import Router from 'koa-router'

const router = new Router({
  prefix: '/user'
})

router.post('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
    list: [{
      name: 'wwx',
      age: 18
    }]
  }
})

export default router