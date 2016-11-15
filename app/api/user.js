import AJAX from '../common/ajax'

export function loadUserInfo({ accessToken, callback }) {

  AJAX({
    url: '/api/v1/user',
    headers: { AccessToken: accessToken },
    type: 'post',
    callback: (result)=>{
      if (result.success) {
        callback(null, result.data)
      } else {
        callback(result.error)
      }
    }
  })

}

export function resetNickname({ nickname, accessToken, callback }) {

  AJAX({
    url: '/api/v1/reset-nickname',
    headers: { AccessToken: accessToken },
    type: 'post',
    data: {
      nickname: nickname
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function resetGender({ gender, accessToken, callback }) {

  AJAX({
    url: '/api/v1/reset-gender',
    headers: { AccessToken: accessToken },
    type: 'post',
    data: {
      gender: gender
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function resetBrief({ brief, accessToken, callback }) {

  AJAX({
    url: '/api/v1/reset-brief',
    headers: { AccessToken: accessToken },
    type: 'post',
    data: {
      brief: brief
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}

export function cropAvatar({ x, y, width, height, accessToken, callback}) {

  AJAX({
    url: '/api/v1/crop-avatar',
    headers: { AccessToken: accessToken },
    type: 'post',
    data: {
      x: x,
      y: y,
      width: width,
      height: height
    },
    callback: (result)=>{
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })

}
