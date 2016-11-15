import * as API from '../api/like'

export function like(data, callback) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.like({ accessToken, data, callback })
  }
}

export function unlike(data, callback) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.unlike({ accessToken, data, callback })
  }
}
