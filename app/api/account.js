import AJAX from '../common/ajax'

export function resetPassword({ currentPassword, newPassword, accessToken, callback }) {

  AJAX({
    url: '/api/v1/reset-password',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      current_password: currentPassword,
      new_password: newPassword
    },
    callback
  })

}

export function sendEmailVerifyCaptcha({ accessToken, callback }) {

  AJAX({
    url: '/api/v1/send-email-verify-captcha',
    type: 'post',
    headers: { AccessToken: accessToken },
    callback
  })

}

export function checkEmailVerifyCaptcha({ captcha, accessToken, callback }) {

  AJAX({
    url: '/api/v1/check-email-verify-captcha',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      captcha: captcha
    },
    callback
  })

}

export function getCaptchaByEmail({ email, accessToken, callback }) {

  AJAX({
    url: '/api/v1/check-email-and-send-verify-captcha',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      email: email
    },
    callback
  })

}

export function resetEmail({ email, captcha, accessToken, callback }) {

  AJAX({
    url: '/api/v1/reset-email',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      email: email,
      captcha: captcha,
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(result.error)
      }
    }
  })

}

export function sendEmailCaptcha({ email, callback }) {

  AJAX({
    url: '/api/v1/send-captcha-to-mailbox',
    type: 'post',
    data: {
      email: email
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(result.error)
      }
    }
  })

}

export function resetPasswordByCaptcha({ email, captcha, newPassword, callback }) {

  AJAX({
    url: '/api/v1/reset-password-by-captcha',
    type: 'post',
    data: {
      email: email,
      captcha: captcha,
      new_password: newPassword
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(result.error)
      }
    }
  })

}


export function bindingEmail({ email, captcha, password, accessToken, callback }) {

  AJAX({
    url: '/api/v1/binding-email',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      email: email,
      captcha: captcha,
      password: password,
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(result.error)
      }
    }
  })

}
