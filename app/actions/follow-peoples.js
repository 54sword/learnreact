import * as API from '../api/follow-peoples'

export function loadFollowPeoples({ userId, page, perPage, callback = ()=>{} }) {
  return (dispatch, getState) => {

    var data = {
      user_id: userId,
      page: page,
      per_page: perPage
    }

    let accessToken = getState().sign.accessToken

    API.loadFollowPeoples({ accessToken, data, callback })
  }
}


export function loadFans({ userId, page, perPage, callback = ()=>{} }) {
  return (dispatch, getState) => {

    var data = {
      user_id: userId,
      page: page,
      per_page: perPage
    }

    let accessToken = getState().sign.accessToken

    API.loadFans({ accessToken, data, callback })
  }
}
