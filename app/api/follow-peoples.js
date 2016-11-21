import AJAX from '../common/ajax'

const load = ({ url, accessToken, data, callback }) => {
  AJAX({
    url: url,
    headers: { AccessToken: accessToken },
    data: data,
    callback: (result) => {
      if (result.success) {
        callback(null, result)
      } else {
        callback(true, result)
      }
    }
  })
}

export function loadFollowPeoples({ accessToken, data, callback }) {
  load({
    url: '/api/v1/fetch-follow-peoples',
    accessToken,
    data,
    callback
  })
}

export const loadFans = ({ accessToken, data, callback }) => {
  load({
    url: '/api/v1/fetch-fans',
    accessToken,
    data,
    callback
  })
}
