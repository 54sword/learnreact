import * as API from '../api/follow-question'

export function follow(questionId, callback = ()=>{}) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken

    API.follow({
      question_id: questionId,
      access_token: accessToken
    }, (err, result)=>{

      if (result && result.success) {
        dispatch({ type: 'UPDATE_QUESTION_FOLLOW', questionId, followStatus: true  })
      }

      callback(err, result)
    })

  }
}

export function cancelFollow(questionId, callback = ()=>{}) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken

    API.cancelFollow({
      question_id: questionId,
      access_token: accessToken
    }, (err, result)=>{

      if (result && result.success) {
        dispatch({ type: 'UPDATE_QUESTION_FOLLOW', questionId, followStatus: false  })
      }

      callback(err, result)
    })

  }
}
