import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import routes from './routes'
import triggerFetch from './common/triggerFetch'

export default async (location, context, store) => {
  await triggerFetch(location, store)

  return (
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
}
