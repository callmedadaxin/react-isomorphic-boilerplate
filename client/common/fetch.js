import 'isomorphic-fetch'
import config from 'server/config'

export const post = (url, params) => {
  return fetch(`${config.host}:${config.port}` + url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(params)
  })
}