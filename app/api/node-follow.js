import AJAX from '../common/ajax'

export function fetchFollowNodes({ accessToken, data, callback }) {

  AJAX({
    url: '/api/v1/fetch-follow-nodes',
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
