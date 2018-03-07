import React, { Component } from 'react'
// import './static/index.scss'
// import avatar from './static/avatar.jpg'
export default class App extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        hello world 1 {data}
        {/* <img src={avatar} alt="" className="avatar" /> */}
      </div>
    )
  }
}
