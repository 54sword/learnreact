
import AJAX from '../common/ajax'

export function follow({ access_token, question_id }, callback) {

  AJAX({
    url: '/api/v1/follow-question',
    type: 'post',
    headers: { AccessToken: access_token },
    data: { question_id: question_id },
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function cancelFollow({ access_token, question_id }, callback) {

  AJAX({
    url: '/api/v1/cancel-follow-question',
    type: 'post',
    headers: { AccessToken: access_token },
    data: { question_id: question_id },
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}
