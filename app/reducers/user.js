/*
import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
*/

import { ADD_ACCESS_TOKEN } from '../constants/ActionTypes'

import cookie from 'react-cookie';

let initialState = {
  token: null,
  userinfo: null,
  showSigninBox: false
}

export default function todos(state = initialState, action) {

  switch (action.type) {

    case 'SET_USER':
      state.userinfo = action.userinfo
      return state

    case ADD_ACCESS_TOKEN:
      state.token = action.token
      // 保存token，保持登录状态
      // $.cookie('accessToken', state.token, { expires: 7, path: '/' })
      cookie.save('accessToken', state.token, { expires: new Date( new Date().getTime() + 1000*60*60*24*7 ), path: '/' })
      return state
    case 'REMOVE_COOKIE':
      // 保存token，保持登录状态
      // $.removeCookie('accessToken', { path: '/' })
      cookie.remove('accessToken', { path: '/' })
      return state

    case 'SIGNIN_PENDING':
      console.log(action)
      // state.token = action.token
      // 保存token，保持登录状态
      // $.cookie('accessToken', state.token, { expires: 7, path: '/' })
      return state
    case 'SIGNIN_FULFILLED':
      console.log(action)
      return state

    case 'SIGNIN':

      console.log(action.status)
      // state.token = action.token
      // 保存token，保持登录状态
      // $.cookie('accessToken', state.token, { expires: 7, path: '/' })
      return state
    case 'SIGNOUT':
      state.token = null
      // $.removeCookie('accessToken')
      cookie.remove('accessToken')
      return state

    case 'SHOW_SIGNIN_BOX':
      state.showSigninBox = action.show
      return state
    default:
      return state
  }

}
