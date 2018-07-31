import Home from './Home'
import About from './About'
import asyncRoute from '@/common/asyncRoute'

export default [{
  path: '/',
  exact: true,
  component: Home
}, {
  path: '/about',
  component: About
}, {
  path: '/user',
  component: asyncRoute(
    () => import(/* webpackChunkName: 'User' */ './User/index.js'),
  )
}]
