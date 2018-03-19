import routes from '../routes'
import { trigger } from 'redial'
import _match from './matchRoutes'

const triggerFetch = async (path, store) => {
  const { components, match, params } = await _match(routes, path)
  const { dispatch, getState } = store
  await trigger('fetch', components, {
    dispatch,
    getState,
    match,
    params
  })
}

export default triggerFetch