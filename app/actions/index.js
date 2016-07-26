import * as types from '../constants/ActionTypes'

import config from '../config/config'
let apiUrl = config.API_URL

export function signin(email, password, callback) {
  return dispatch => {
    $.ajax({
      url: apiUrl+'/api/v1/signin',
      type: 'post',
      data: {
        email: email,
        password: password
      },
      error(err) {
        callback(err.responseJSON.error)
      },
      success(result) {
        dispatch(addAccessToken(result.data.access_token))
        callback(null)
      }
    })
  };
}

export function setUser(userinfo) {
  return { type: 'SET_USER', userinfo }
}

export function addAccessToken(token) {
  return { type: types.ADD_ACCESS_TOKEN, token }
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
