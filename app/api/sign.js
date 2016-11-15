import AJAX from '../common/ajax'

export function signin({ email, password, callback }) {

  AJAX({
    url: '/api/v1/signin',
    type: 'post',
    data: {
      email: email,
      password: password
    },
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function signup({ data, callback }) {

  AJAX({
    url: '/api/v1/signup',
    type: 'post',
    data: data,
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}
