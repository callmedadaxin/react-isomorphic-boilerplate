import React from 'react'
import App from './App'
import { StaticRouter } from 'react-router-dom'

export default (location, context) => <StaticRouter
  location={location}
  context={context}
>
  <App />
</StaticRouter>