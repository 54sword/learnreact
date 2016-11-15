import * as API from '../api/captcha'

export function addCaptcha(data, callback) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.addCaptcha({ accessToken, data, callback })
  }
}
