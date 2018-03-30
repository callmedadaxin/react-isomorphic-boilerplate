import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createFetchMiddleware from 'redux-data-fetch-middleware'

import reducer from '../reducer'
import { post } from '@/common/fetch'

const handleResponse = res => res.json()
const reduxFetch = createFetchMiddleware(post, handleResponse)

const middleWare = [thunk, reduxFetch]

export default function (initialState) {
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