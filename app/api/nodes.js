
import AJAX from '../common/ajax'

export function fetchNodes({ accessToken, data, callback }) {

  AJAX({
    url: '/api/v1/nodes',
    headers: { AccessToken: accessToken },
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

export function followNode({ id, accessToken, callback }) {

  AJAX({
    url: '/api/v1/follow-node/'+id,
    headers: { AccessToken: accessToken },
    type: 'post',
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function unfollowNode({ id, accessToken, callback }) {

  AJAX({
    url: '/api/v1/unfollow-node/'+id,
    headers: { AccessToken: accessToken },
    type: 'post',
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}
