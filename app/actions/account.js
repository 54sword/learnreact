import * as API from '../api/account'

export function resetPassword({ currentPassword, newPassword, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.resetPassword({
      currentPassword, newPassword, accessToken, callback
    })
  }
}

export function sendEmailVerifyCaptcha({ callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.sendEmailVerifyCaptcha({
      accessToken, callback
    })
  }
}

export function checkEmailVerifyCaptcha({ captcha, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.checkEmailVerifyCaptcha({
      captcha, accessToken, callback
    })
  }
}

export function getCaptchaByEmail({ email, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.getCaptchaByEmail({
      email, accessToken, callback
    })
  }
}

export function resetEmail({ captcha, email, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.resetEmail({
      captcha, email, accessToken, callback
    })
  }
}

export function sendEmailCaptcha({ email, callback = () =>{} }) {
  return (dispatch) => {
    API.sendEmailCaptcha({
      email,
      callback: function(err, result){
        if (err) {
          callback(err)
        } else {
          callback(null, result)
        }
      }
    })
  }
}

export function resetPasswordByCaptcha({ email, captcha, newPassword, callback }) {
  return (dispatch) => {



    API.resetPasswordByCaptcha({
      email,
      captcha,
      newPassword,
      callback: function(err, result){
        if (err) {
          callback(err)
        } else {
          callback(null, result)
        }
      }
    })
  }
}

export function bindingEmail({ email, captcha, password, callback }) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken

    API.bindingEmail({
      email,
      captcha,
      password,
      accessToken,
      callback: function(err, result){
        if (err) {
          callback(err)
        } else {
          callback(null, result)
        }
      }
    })
  }
}
