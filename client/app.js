import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes/index'

export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/user">Users</Link></li>
        </ul>
        <hr/>
        {
          renderRoutes(routes)
        }
      </div>
    )
  }
}
