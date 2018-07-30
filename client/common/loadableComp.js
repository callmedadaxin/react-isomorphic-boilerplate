import Loadable from 'react-loadable'
import Loading from './loading'
import { registerReducer } from '../store'

/**
 * 先引用异步的reducer并进行注入，
 * 再引入组件
 */
export default (componentName, store, config = {}) => {
  // 默认将与componentName同名的reducer进行拆分
  const { asyncReducers } = config

  return Loadable({
    loader: () => {
      const reducers = asyncReducers.map(name => {
        return import(/* webpackChunkName: '[request]' */ `../reducer/${name}/index`)
          .then(result => ({
            name,
            reducer: result.default
          }))
      })
      return Promise.all(reducers).then(result => {
        // registerReducer(store, result)
        return import(/* webpackChunkName: '[request]' */ `../container/${componentName}.js`)
          .then(object => {
            console.log(object.default)
            return object.default
          })
      })
    },
    loading: Loading,
  })
}
