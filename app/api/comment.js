import AJAX from '../common/ajax'

export function addComment({ answerId, replyId, content, deviceId, accessToken, callback }) {

  AJAX({
    url: '/api/v1/add-comment',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      answer_id : answerId,
      reply_id : replyId,
      content: content,
      device_id : deviceId
    },
    callback: (result) => {
      if (result.success) {
        callback(null, result);
      } else {
        callback(true, result)
      }
    }
  })

}

export const loadComments = ({ accessToken, data, callback }) => {

  let _data = {}

  if (data.gt_create_at) {
    _data.gt_create_at = data.gt_create_at
  }

  if (data.page) {
    _data.page = data.page
  }

  if (data.per_page) {
    _data.per_page = data.per_page
  }

  if (data.answer_id) {
    _data.answer_id = data.answer_id
  }

  AJAX({
    url: '/api/v1/comments',
    type: 'get',
    headers: { AccessToken: accessToken },
    data: _data,
    callback: (result) => {
      if (result.success) {
        callback(null, result.data);
      } else {
        callback(true, result)
      }
    }
  })

}
