import * as API from '../api/notification'

export function loadNotifications(data, callback = ()=>{} ) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken
    let unreadNotice = getState().user.unreadNotice

    API.fetch({
      access_token: accessToken,
      data,
      callback: (result)=>{

        let notices = result.data
        let count = 0

        for (let i = 0, max = notices.length; i < max; i++) {
          if (!notices[i].has_read) {
            count++
          }
        }

        unreadNotice = unreadNotice - count
        if (unreadNotice < 0) {
          unreadNotice = 0
        }

        dispatch({ type: 'SET_UNREAD_NOTICE', unreadNotice: unreadNotice })

        callback(result)
      }
    })
  }
}

export function loadUnreadCount() {
  return (dispatch, getState) => {
    let accessToken = getState().sign.accessToken

    const run = () => {
      API.loadUnreadCount({
        accessToken: accessToken,
        callback: function(result){
          dispatch({ type: 'SET_UNREAD_NOTICE', unreadNotice: result.data })

          setTimeout(function(){
            run()
          }, 1000 * 60 * 2)
        }

      })
    }

    setTimeout(()=>{
      run()
    }, 1000 * 5)

  }
}
