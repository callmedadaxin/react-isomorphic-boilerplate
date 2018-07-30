import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createFetchMiddleware from 'redux-data-fetch-middleware'

import reducer from '../reducer'
import { post } from '@/common/fetch'

const handleResponse = res => res.json()
const reduxFetch = createFetchMiddleware(post, handleResponse)

const middleWare = [thunk, reduxFetch]

const makeRootReducer = asyncReducers => {
  return combineReducers({
    ...asyncReducers
  });
};

export default (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleWare)
  )

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextRootReducer = require('../reducer')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export function registerReducer(store, reducers) {
  !store.async && (store.async = [])
  reducers.forEach(item => {
    store.async[item.name] = item.reducer
  })
  store.replaceReducer(makeRootReducer(store.async))
};
