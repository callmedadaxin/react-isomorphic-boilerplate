
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './user.scss'

export default class user extends PureComponent {
  render() {
    const { userList } = this.props
    return (
      <div>
        <h2 className="red">User1</h2>
        <ul>
          {
            userList.list.map(item => (
              <li key={item.name}>{item.name}: {item.age}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}
