import Home from '@/components/home'
import About from '@/components/about'
import loadableComp from '@/common/loadableComp'

export default (store) => [{
  path: '/',
  exact: true,
  component: Home
}, {
  path: '/about',
  component: About
}, {
  path: '/user',
  component: loadableComp('user', store, {
    asyncReducers: ['users']
  })
}]