
import AJAX from '../common/ajax'

export function fetch({ access_token, data, callback }) {
  AJAX({
    url: '/api/v1/notifications',
    type: 'post',
    data: data,
    headers: { AccessToken: access_token },
    callback
  });
}

export function loadUnreadCount({ accessToken, callback }) {
  AJAX({
    url: '/api/v1/unread-notifications',
    type: 'get',
    headers: { AccessToken: accessToken },
    callback
  });
}
