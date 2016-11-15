import * as API from '../api/follow-question'

export function follow(questionId, callback = ()=>{}) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken

    API.follow({
      question_id: questionId,
      access_token: accessToken
    }, callback)
  }
}

export function cancelFollow(questionId, callback = ()=>{}) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken

    API.cancelFollow({
      question_id: questionId,
      access_token: accessToken
    }, callback)

  }
}
