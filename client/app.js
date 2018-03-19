import React, { Component } from 'react'
import Home from './components/home'
import About from './components/about'
import User from '@/container/user'
import {
  Route, Link
} from 'react-router-dom'

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

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/user" component={User} />
      </div>
    )
  }
}
