import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import createStore from './store'
import triggerFetch from './common/triggerFetch'

const initialState = window.REDUX_STATE
const store = createStore(initialState)

const AutoFetchWhenRouterChange = WrappedComponent =>
  class extends Component {
    componentWillMount () {
      triggerFetch(this.props.location.pathname, store)
    }
    
    componentWillReceiveProps(nextProps) {
      const navigated = nextProps.location !== this.props.location
      if (navigated) {
        // Don't fetch data for initial route, server has already done the work:
        if (window.REDUX_STATE) {
          // Delete initial data so that subsequent data fetches can occur:
          delete window.REDUX_STATE;
        } else {
          triggerFetch(nextProps.location.pathname, store)
        }
      }
    }
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

const routes = [{
  component: AutoFetchWhenRouterChange(App)
}]

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
