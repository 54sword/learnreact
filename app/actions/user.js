
import * as API from '../api/user'

function setUser(userinfo) {
  return { type: 'SET_USER', userinfo }
}

export function addAccessToken(accessToken) {
  return { type: 'ADD_ACCESS_TOKEN', accessToken }
}

export function removeAccessToken() {
  return { type: 'REMOVE_ACCESS_TOKEN' }
}

export function loadUserInfo({ accessToken = null, callback = ()=>{} }) {
  return (dispatch, getState) => {

    accessToken = accessToken || getState().sign.accessToken

    API.loadUserInfo({
      accessToken,
      callback: function(err, data) {
        if (err) {
          callback(err)
          return
        }
        dispatch(setUser(data))
        callback(null)
      }
    })

  }
}

export function resetNickname({ nickname, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.resetNickname({ nickname, accessToken, callback })
  }
}

export function resetGender({ gender, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.resetGender({ gender, accessToken, callback })
  }
}

export function resetBrief({ brief, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.resetBrief({ brief, accessToken, callback })
  }
}

export function cropAvatar({ x, y, width, height, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.cropAvatar({ x, y, width, height, accessToken, callback })
  }
}
