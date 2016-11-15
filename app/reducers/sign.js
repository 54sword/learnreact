import cookie from 'react-cookie'

let initialState = {
  accessToken: '',
  show: false
}

export default function sign(state = initialState, action) {

  switch (action.type) {

    case 'ADD_ACCESS_TOKEN':
      state.accessToken = action.accessToken
      cookie.save('accessToken', state.accessToken, { expires: new Date( new Date().getTime() + 1000*60*60*24*7 ), path: '/' })
      return state

    case 'REMOVE_ACCESS_TOKEN':
      state.accessToken = ''
      cookie.remove('accessToken', { path: '/' })
      return state

    case 'SHOW_SIGN':
      return Object.assign({}, state, {
        show: true
      })

    case 'HIDE_SIGN':
      return Object.assign({}, state, {
        show: false
      })

    default:
      return state
  }

}

export function isSignin(state) {
  return state.sign.accessToken != '' ? true : false
}

export function getSignStatus(state) {
  return state.sign.show
}

export function getAccessToken(state) {
  return state.sign.accessToken || ''
}
