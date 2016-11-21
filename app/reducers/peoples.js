
import merge from 'lodash/merge'

let initialState = {
  other: {
    data: []
  }
}

export default function peoples(state = initialState, action) {
  switch (action.type) {

    // 添加新的列表
    case 'SET_PEOPLE_LIST':
      var { name, filters, data, loading, more } = action
      state[name] = {
        filters: filters,
        data: data,
        loading: loading,
        more: more
      }
      return merge({}, state, {})

    // 添加单个人到other
    case 'ADD_PEOPLE':
      var { people } = action
      state['other'].data.push(people)
      return merge({}, state, {})

    case 'UPLOAD_PEOPLE_FOLLOW':

      var { peopleId, followStatus, selfId } = action

      // console.log(state)

      for (let i in state) {
        let peoples = state[i].data
        for (let n = 0, max = peoples.length; n < max; n++) {

          // 更新用户粉丝数量和状态
          if (peoples[n]._id == peopleId) {
            state[i].data[n].fans_count += followStatus ? 1 : -1
            state[i].data[n].follow = followStatus
          }

          // 更新自己关注用户的累积
          if (peoples[n]._id == selfId) {
            state[i].data[n].follow_people_count += followStatus ? 1 : -1
          }

        }
      }

      return merge({}, state, {})

    default:
      return state
  }
}

export function getPeoples(state, name) {
  return state.peoples[name] ? state.peoples[name].data : []
}

export function getLoading(state, name) {
  return state.peoples[name] ? state.peoples[name].loading : true
}

export function getMore(state, name) {
  return state.peoples[name] ? state.peoples[name].more : true
}

// 获取agents
export function getPeopleById(state, id) {

  let peopleList = state.peoples

  for (let i in peopleList) {
    let peoples = peopleList[i].data
    for (let n = 0, max = peoples.length; n < max; n++) {
      if (peoples[n]._id == id) {
        return [peoples[n]]
      }
    }
  }

  return []
}
