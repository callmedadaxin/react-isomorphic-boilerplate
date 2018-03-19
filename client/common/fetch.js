import 'isomorphic-fetch'

export const post = (url, params) => {
  return fetch('http://localhost:8089' + url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(params)
  })
}