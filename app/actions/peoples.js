
import * as API from '../api/people'

function addPeople(people) {
  return { type: 'ADD_PEOPLE', people }
}

export function loadPeopleById({ peopleId, callback }) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken || null

    API.fetchUserById({
      id: peopleId,
      accessToken,
      callback: function(err, result){

        callback(err, result)

        if (err) {
          // console.log(err)
          return
        }

        if (result && result.success) {
          dispatch(addPeople(result.data))
        }
      }
    })
  }
}
/*
export function loadFollowPeoples({ callback = ()=>{} }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.loadFollowPeoples({
      accessToken,
      callback: function(err, result){
        dispatch({ type: 'ADD_FOLLOW_PEOPLES', peoples: result.data })
        callback(err, result)
      }
    })
  }
}
*/
export function follow({ userId, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.follow({ userId, accessToken, callback })
  }
}

export function unfollow({ userId, callback }) {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken
    API.unfollow({ userId, accessToken, callback })
  }
}
