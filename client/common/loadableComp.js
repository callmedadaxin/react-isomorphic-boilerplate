import Loadable from 'react-loadable'
import Loading from './loading'

export default (componentName) => {
  return Loadable({
    loader: () => import(`../container/${componentName}.js`).then(object => object.default),
    loading: Loading,
  })
}
