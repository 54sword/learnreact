
import AJAX from '../common/ajax'

export function like({ accessToken, data, callback }) {

  AJAX({
    url: '/api/v1/like',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      type: data.type,
      target_id: data.target_id,
      mood: data.mood
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


export function unlike({ accessToken, data, callback }) {

  AJAX({
    url: '/api/v1/unlike',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      type: data.type,
      target_id: data.target_id
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
