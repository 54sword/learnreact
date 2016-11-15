import AJAX from '../common/ajax'

export function addCaptcha({ accessToken, data, callback }) {

  AJAX({
    url: '/api/v1/get-captcha',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: data,
    callback: (result) => {
      if (result.success) {
        callback(null, result);
      } else {
        callback(true, result)
      }
    }
  })

}
