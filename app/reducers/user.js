
import merge from 'lodash/merge'

let initialState = {
  profile: {},
  followPeoples: [],
  unreadNotice: 0
}

export default function user(state = initialState, action) {

  switch (action.type) {

    case 'SET_USER':
      state.profile = action.userinfo
      return merge({}, state, {})

    case 'ADD_FOLLOW_PEOPLES':
      state.followPeoples = action.peoples
      return merge({}, state, {})

    case 'SET_UNREAD_NOTICE':
      state.unreadNotice = action.unreadNotice
      return merge({}, state, {})

    default:
      return state
  }

}

export function getUserInfo(state) {
  return state.user.profile || {}
}

export function getFollowStatusByPeopleId(state, peopleId) {
  let followList = state.user.followPeoples
  return followList.indexOf(peopleId) == -1 ? false : true
}

export function getUnreadNotice(state) {
  return state.user.unreadNotice || 0
}
