import Loadable from 'react-loadable'
import Loading from './loading'

export default (componentName) => {
  return Loadable({
    loader: () => {
      // return 
      // import(`../reducers/${key}/index`)
      return import(`../container/${componentName}.js`)
    },
    loading: Loading,
  })
}
