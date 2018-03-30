import { actionCreator } from 'redux-data-fetch-middleware'

export const getUserListActions = actionCreator('GET_USER_LIST')

export const getUserList = (params) => ({
  url: '/api/user',
  params: params,
  handleResult: res => res.list,
  types: getUserListActions
})
