import * as API from '../api/oauth'

export function unbindingQQ({ callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.unbindingQQ({ accessToken, callback })
  }
}

export function unbindingWeibo({ callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.unbindingWeibo({ accessToken, callback })
  }
}
