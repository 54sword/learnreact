import * as API from '../api/comment'

export function addComment({ answerId, replyId, content, deviceId, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.addComment({
      answerId, replyId, content, deviceId, accessToken, callback
    })
  }
}

export const loadComments = (data, callback) => {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.loadComments({ accessToken, data, callback })
  }
}
