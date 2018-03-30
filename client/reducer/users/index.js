import { combineReducers } from 'redux'
import { reducerCreator } from 'redux-data-fetch-middleware'
import {
  getUserListActions
} from '@/actions/users'

const [GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILED] = getUserListActions
const fetchedUserList = reducerCreator(getUserListActions)

const initUsers = {
  list: []
}

const userList = (state = initUsers, action) => {
  switch (action.type) {
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    default:
    return state
  }
}

export default combineReducers({
  userList: fetchedUserList(userList)
})