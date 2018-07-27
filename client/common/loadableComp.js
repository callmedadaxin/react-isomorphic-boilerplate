import Loadable from 'react-loadable'
import Loading from './loading'

export default (componentName) => {
  return Loadable({
    loader: () => import(/* webpackChunkName: '[request]' */ `../container/${componentName}.js`).then(object => object.default),
    loading: Loading,
  })
}
