import * as types from '../constants/ActionTypes'

export function setUser(userinfo) {
  return { type: 'SET_USER', userinfo }
}

export function setToken(token) {
  return { type: 'SET_TOKEN', token }
}

export function removeToken() {
  return { type: 'REMOVE_COOKIE' }
}

export function showSigninBox(show) {
  return { type: 'SHOW_SIGNIN_BOX', show }
}

export function addQuestions(questions) {
  return { type: 'ADD_QUESTIONS', questions }
}

export function loadingQuestions(bl) {
  return { type: 'LOADING_QUESTIONS', bl }
}

export function nomoreQuestion(bl) {
  return { type: 'NOMORE_QUESTIONS', bl }
}

export function setScroll(name) {
  return { type: 'SET_SCROLL', name }
}

export function setScrollPosition(name) {
  return { type: 'SET_SCROLL_POSITION', name }
}
