import React from 'react'
import Loadable from 'react-loadable'
import Loading from './loading'
import { registerReducer } from '../store'

function noop() {}

/**
 * 异步的Route
 * @param loadComp 用于异步加载container的func  () => import('./container/user')
 * @param loadReducer 用于异步加载reducers的object || array 
 * {
 *   name: 'users' // reducer对应的键
 *   loader: () => import('./reducers/users')
 * }
 */
export default store => (loadComp = noop) => {
  return Loadable({
    loader: () => {
      return loadComp()
        // .then(result => {
        //   const { default: Component, reducer, reducers = [] } = result
        //   let resultReducers = []
        //   reducer && (resultReducers.push(reducer))
        //   reducers.length && (resultReducers = resultReducers.concat(reducers))

        //   Loadable.asyncReducers = resultReducers
        //   // registerReducer(store, resultReducers)
        //   return Component
        // })
    },
    loading: Loading
  })
}
