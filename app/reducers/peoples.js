
import merge from 'lodash/merge'
import { WEBSITE_URL } from '../../config/config'

let initialState = {}

export default function peoples(state = initialState, action) {
  switch (action.type) {

    // 添加agents
    case 'ADD_PEOPLE':
      var { people } = action
      state[people._id] = people
      return merge({}, state, {})

    default:
      return state
  }
}

// 获取agents
export function getPeopleById(state, id) {
  return state.peoples[id] ? [state.peoples[id]] : []
}

// 判断是否存在
export function isPeopleExist(state, id) {
  return state.peoples[id] ? true : false
}
