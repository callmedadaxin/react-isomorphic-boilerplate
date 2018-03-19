import { post } from '@/common/fetch'

export const GET_USERS_SUCCESS = Symbol('GET_USERS_SUCCESS')

const getUserSuccess = payload => ({
  type: GET_USERS_SUCCESS,
  payload
})

export const getUserList = (params) => dispatch => {
  return post('/api/user')
    .then(r => r.json())
    .then(r => {
      dispatch(getUserSuccess(r.list))
    })
    .catch(e => {
      console.log(e)
    })
}