import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import reducer from '../reducer'

const middleWare = [thunk]

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