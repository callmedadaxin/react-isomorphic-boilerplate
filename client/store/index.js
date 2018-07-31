import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createFetchMiddleware from 'redux-data-fetch-middleware'

import { post } from '@/common/fetch'

const handleResponse = res => res.json()
const reduxFetch = createFetchMiddleware(post, handleResponse)

const middleWare = [thunk, reduxFetch]

const makeRootReducer = (asyncReducers = {}) => {
  return combineReducers(asyncReducers);
};

export default (initialState) => {
  const store = createStore(
    () => {},
    initialState,
    applyMiddleware(...middleWare)
  )
  store.async = store.async || {}
  return store
}

export function registerReducer(store, reducers) {
  reducers.forEach(item => {
    store.async[item.name] = item.reducer
  })
  store.replaceReducer(makeRootReducer(store.async))
};
