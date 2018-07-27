import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'

import createStore from './store'
import triggerFetch from './common/triggerFetch'

const initialState = window.REDUX_STATE
const store = createStore(initialState)

// auto trigger fetch action when route change
const AutoFetchWhenRouterChange = WrappedComponent =>
  class extends Component {
    componentWillReceiveProps(nextProps) {
      const navigated = nextProps.location !== this.props.location
      if (navigated) {
        triggerFetch(nextProps.location.pathname, store)
      }
    }
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

const render = (App) => {
  const routes = [{
    component: AutoFetchWhenRouterChange(App)
  }]

  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
          {/* {renderRoutes(routes)} */}
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
}

render(App);

if(module.hot){
  module.hot.accept() //接受模块更新的事件，同时阻止这个事件继续冒泡
}




