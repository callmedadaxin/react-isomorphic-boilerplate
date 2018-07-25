import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'

import App from './app'
import triggerFetch from './common/triggerFetch'

export default async (location, context, store, modules) => {
  await triggerFetch(location, store)

  return {
    html: <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>,
    modules
  }
}
