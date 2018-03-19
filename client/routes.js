import App from '@/app'
import Home from '@/components/home'
import About from '@/components/about'
import User from '@/container/user'

export default [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/about',
    component: About
  }, {
    path: '/user',
    component: User
  }]
}]