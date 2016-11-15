import * as API from '../api/node-follow'

export function loadFollowNodes({ userId, page, perPage, callback = ()=>{} }) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken || null

    let data = {
      user_id: userId,
      page: page,
      per_page: perPage
    }

    API.fetchFollowNodes({ accessToken, data, callback })
  }
}
