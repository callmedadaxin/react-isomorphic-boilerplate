import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'

import App from './app'
import triggerFetch from './common/triggerFetch'

export default async (location, context, store, modules) => {
  await triggerFetch(location, store)

  console.log(store.getState())

  return {
    html: renderToString(<Loadable.Capture report={moduleName => {
      console.log(moduleName)
      modules.push(moduleName)
    }}>
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>),
    modules
  }
}
