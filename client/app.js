import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

export default class App extends Component {
  render() {
    const { data } = this.props
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
