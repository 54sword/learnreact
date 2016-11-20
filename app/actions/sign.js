import { API_URL } from '../../config/config'

import * as API from '../api/sign'

export function showSign() {
  return { type: 'SHOW_SIGN' }
}

export function hideSign() {
  return { type: 'HIDE_SIGN' }
}

export function addAccessToken(accessToken) {
  return { type: 'ADD_ACCESS_TOKEN', accessToken }
}

export function signout() {
  return { type: 'REMOVE_ACCESS_TOKEN' }
}

// 登录
export function signin(email, password, callback) {
  return dispatch => {

    API.signin({
      email,
      password,
      callback: (err, result) => {
        if (!err) {
          dispatch(addAccessToken(result.data.access_token))
        }
        callback(err, result)
      }
    })

  }
}

// 注册
export function signup(data, callback) {
  return dispatch => {
    API.signup({ data, callback })
  }
}


// 注册邮箱验证
export function signupEmailVerify(code, callback) {
  return dispatch => {
    API.signupEmailVerify({ code, callback })
  }
}
