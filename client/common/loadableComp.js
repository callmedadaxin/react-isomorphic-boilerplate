import Loadable from 'react-loadable'
import Loading from './loading'

export default (componentName) => {
  return Loadable({
    loader: () => {
      // return 
      // import(`../reducers/${key}/index`)
      console.log(componentName)
      return import(`../container/${componentName}.js`)
    },
    loading: Loading,
  })
}
