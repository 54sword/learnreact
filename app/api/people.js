import AJAX from '../common/ajax'

export function fetchUserById({ id, accessToken, callback }) {

  AJAX({
    url: '/api/v1/people/'+id,
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

export function follow({ userId, accessToken, callback }) {

  AJAX({
    url: '/api/v1/follow-user/'+userId,
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

export function unfollow({ userId, accessToken, callback }) {

  AJAX({
    url: '/api/v1/unfollow-user/'+userId,
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
