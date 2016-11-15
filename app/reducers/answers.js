
import merge from 'lodash/merge'

let initialState = {
  other: {
    data: []
  }
}

export default function answers(state = initialState, action) {

  switch (action.type) {

    case 'ADD_NEW_ANSWERS_LIST':
      var { name, filters } = action
      if (state[name]) return state
      state[name] = {
        loading: false,
        filters: filters || {},
        data: [],
        nomore: false
      }
      return merge({}, state, {})

    case 'RESET_NEW_ANSWERS_LIST':
      var { name, filters } = action
      state[name] = {
        loading: false,
        filters: filters || {},
        data: [],
        nomore: false
      }
      return merge({}, state, {})

    // 设置loading状态
    case 'ANSWERS_LOADING_STATUS':
      var { name, status } = action
      state[name].loading = status
      return merge({}, state, {})

    // 是否有更多数组
    case 'ANSWERS_NOMORE_STATUS':
      var { name, status } = action
      state[name].nomore = status
      return merge({}, state, {})

    case 'ADD_ANSWERS':

      var { name, answers } = action
      state[name].data = state[name].data.concat(answers)
      state[name].filters.date = answers[answers.length - 1].create_at

      // 没有更多
      if (state[name].filters.per_page && answers.length < state[name].filters.per_page ||
        answers.length == 0
      ) {
        state[name].nomore = true
      }

      return merge({}, state, {})

    case 'ADD_ANSWER':
      state['other'].data.push(action.answer)
      return merge({}, state, {})

    default:
      return state
  }

}

export function getAnswersByName(state, name) {
  return state.answers[name] ? state.answers[name].data : []
}

export function getAnswersLoadingStatus(state, name) {
  return state.answers[name] ? state.answers[name].loading : false
}

export function getAnswersNomoreStatus(state, name) {
  return state.answers[name] ? state.answers[name].nomore : false
}

export function getAnswerById(state, id) {

  let answerList = state.answers

  for (let i in answerList) {
    if (answerList[i].data) {
      let answers = answerList[i].data
      for (let n = 0, max = answers.length; n < max; n++) {
        if (answers[n]._id == id) {
          return [answers[n]]
        }
      }
    }
  }

  return []

}
