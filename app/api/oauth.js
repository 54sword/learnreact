import AJAX from '../common/ajax'

export function unbindingQQ({ accessToken, callback }) {

  AJAX({
    url: '/oauth/unbinding-qq',
    type: 'post',
    headers: { AccessToken: accessToken },
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function unbindingWeibo({ accessToken, callback }) {

  AJAX({
    url: '/oauth/unbinding-weibo',
    type: 'post',
    headers: { AccessToken: accessToken },
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}
