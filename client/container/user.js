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
class UserContainer extends Component {
  render() {
    const { actions, dispatch, userList } = this.props
    return (
      <UserComp userList={userList}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state.users
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      getUserList
    }, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
