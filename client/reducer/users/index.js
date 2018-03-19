import { combineReducers } from 'redux'
import {
  GET_USERS_SUCCESS
} from '@/actions/users'

const initUsers = {
  list: []
}

const userList = (state = initUsers, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    default:
    return state
  }
}

export default combineReducers({
  userList
})