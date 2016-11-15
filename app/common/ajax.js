
import { API_URL, debug } from '../../config/config'

const AJAX = ({ url = '', type = 'get', data = {}, headers = {}, callback = ()=>{} }) => {

  if (debug) {
    console.log(type)
    console.log(url)
    console.log(data)
    console.log(headers)
  }

  // 如果 access_token 则不发送 headers
  if (!headers.AccessToken) {
    headers = null
  }

  // 如果是 post 请求，那么如果需要传递 access_token，可以放置到 data 中
  if (type == 'post' && headers && headers.AccessToken != '') {
    data.access_token = headers.AccessToken
    headers = null
  }

  if (type == 'get') {
    url += '?_r='+new Date().getTime()
  }

  $.ajax({
    url: API_URL + url,
    type: type,
    headers: headers,
    data: data,
    beforeSend: function(request) {
    },
    error(err) {
      callback(err.responseJSON)
    },
    success(result) {
      callback(result)
    }
  })

}

export default AJAX
