import routes from '../routes/index'
import { trigger } from 'redial'
import _match from './matchRoutes'
import { registerReducer } from '../store/index'

const triggerFetch = async (path, store) => {
  const { components, match, params, reducers } = await _match(routes, path)
  registerReducer(store, reducers)
  const { dispatch, getState } = store
  await trigger('fetch', components, {
    dispatch,
    getState,
    match,
    params
  })
}

export default triggerFetch