import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { provideHooks } from 'redial';
import {
  getUserList
} from '@/actions/users/index.js'
import UserComp from '@/components/user'

@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(getUserList())
})
@connect(state => state.users)
export default class UserContainer extends Component {
  render() {
    const { userList } = this.props
    return (
      <UserComp userList={userList}/>
    )
  }
}

