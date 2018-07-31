import React, { Component } from 'react'
import { connect } from "react-redux"
import { provideHooks } from 'redial';
import {
  getUserList
} from './actions'
import UserComp from './components'

// 将reducer也进行拆分
export { default as reducer } from './reducers'

@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(getUserList(params))
})
@connect(state => state.user)
export default class UserContainer extends Component {
  render() {
    const { userList } = this.props
    return (
      <UserComp userList={userList}/>
    )
  }
}

