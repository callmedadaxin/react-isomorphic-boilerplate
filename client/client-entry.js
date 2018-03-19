import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import routes from './routes'
import createStore from './store'
import triggerFetch from './common/triggerFetch'

const initialState = window.REDUX_STATE
const store = createStore(initialState)

// BrowserRouter.listen(async location => {
//   // Don't fetch data for initial route, server has already done the work:
//   if (window.REDUX_STATE) {
//     // Delete initial data so that subsequent data fetches can occur:
//     delete window.REDUX_STATE;
//   } else {
//     triggerFetch(location, store)
//   }
// })

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
