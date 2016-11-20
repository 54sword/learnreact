
import merge from 'lodash/merge'

import {
  ADD_QUESTIONS,
  QUESTIONS_LOADING_STATUS,
  QUESTIONS_NOMORE_STATUS,
  ADD_NEW_QUESTIONS_LIST
} from '../constants/QuestionsTypes'

/*
let initialState = {
  loading: false,
  perPage: 20,
  date: new Date().getTime(),
  questions: [],
  nomore: false
}
*/

let initialState = {
  other: {
    data: []
  }
}

export default function questions(state = initialState, action) {

  switch (action.type) {
    // 添加新的列表
    case ADD_NEW_QUESTIONS_LIST:
      var { name, filters } = action
      if (state[name]) return state
      state[name] = {
        loading: false,
        filters: filters || {},
        data: [],
        nomore: false
      }
      return merge({}, state, {})

    // 重置问题的列表
    case 'RESET_QUESTIONS_LIST':

      var { name, filters } = action

      state[name] = {
        loading: false,
        filters: filters || {},
        data: [],
        nomore: false
      }
      return merge({}, state, {})

    case 'DELETE_QUESTIONS_LIST':
      var { name } = action
      delete state[name]
      return merge({}, state, {})

    // 添加数组
    case ADD_QUESTIONS:
      var { name, questions, unshift = false } = action

      if (!state[name]) {
        return state
      }

      if (unshift) {
        state[name].data = questions.concat(state[name].data)
      } else {

        state[name].data = state[name].data.concat(questions)
        state[name].filters.gt_create_at = questions[questions.length - 1].last_comment_at // new Date(questions[questions.length - 1].last_comment_at).getTime()

        // 没有更多
        if (state[name].filters.per_page && questions.length < state[name].filters.per_page ||
          questions.length == 0
        ) {
          state[name].nomore = true
        }

      }

      return merge({}, state, {})

    // 添加一个问题
    case 'ADD_QUESTION':
      var { question } = action
      state['other'].data.push(question)
      return merge({}, state, {})

    // 设置loading状态
    case QUESTIONS_LOADING_STATUS:
      var { name, status } = action
      state[name].loading = status
      return merge({}, state, {})

    // 是否有更多数组
    case QUESTIONS_NOMORE_STATUS:
      var { name, status } = action
      state[name].nomore = status
      return merge({}, state, {})

    // 更新所有列表中 questionid 的 follow 状态
    case 'UPDATE_QUESTION_FOLLOW':
      var { questionId, followStatus } = action

      for (let i in state) {
        let data = state[i].data
        if (data.length > 0) {
          for (let n = 0, max = data.length; n < max; n++) {
            if (data[n]._id == questionId) {
              state[i].data[n].follow_count += followStatus ? 1 : -1
              state[i].data[n].follow = followStatus
            }
          }
        }
      }

      return merge({}, state, {})
    default:
      return state
  }

}

export function getQuestionsByName(state, name) {
  return state.questions[name] ? state.questions[name].data : []
}

export function getQuestionsLoadingStatus(state, name) {
  return state.questions[name] ? state.questions[name].loading : false
}

export function getQuestionsNomoreStatus(state, name) {
  return state.questions[name] ? state.questions[name].nomore : false
}

// 获取当个房源
export function getQuestionById(state, id) {

  let questionsList = state.questions

  for (let i in questionsList) {
    if (questionsList[i].data) {
      let questions = questionsList[i].data
      for (let n = 0, max = questions.length; n < max; n++) {
        if (questions[n]._id == id) {
          return [questions[n]]
        }
      }
    }
  }

  return []

}
