import * as API from '../api/follow-peoples'

export function loadFollowPeoples({ name, data = {}, callback = ()=>{} }) {
  return (dispatch, getState) => {

    const accessToken = getState().sign.accessToken
    const list = getState().peoples[name] || {}

    if (typeof(list.more) != 'undefined' && !list.more ||
      list.loading
    ) {
      return
    }

    if (!list.data) {
      list.data = []
    }

    if (!list.filters) {
      data.page = 0
      data.per_page = 20
      list.filters = data
    } else {
      data = list.filters
      data.page = data.page + 1
    }

    if (!list.more) {
      list.more = true
    }

    dispatch({
      type: 'SET_PEOPLE_LIST',
      name,
      filters: list.filters,
      data: list.data,
      loading: true,
      more: true
    })

    API.loadFollowPeoples({
      accessToken,
      data,
      callback:(err, result)=>{

        callback(err, result)

        if (!result.success) {
          return
        }

        let more =  result.data.length < data.per_page ? false : true

        list.data = list.data.concat(result.data)

        list.filters.page = list.filters.page + 1

        dispatch({
          type: 'SET_PEOPLE_LIST',
          name,
          filters: list.filters,
          data: list.data,
          loading: false,
          more: more
        })

      }
    })

  }
}

export function loadFans({ name, data = {}, callback = ()=>{} }) {
  return (dispatch, getState) => {

    const accessToken = getState().sign.accessToken
    const list = getState().peoples[name] || {}

    if (typeof(list.more) != 'undefined' && !list.more ||
      list.loading
    ) {
      return
    }

    if (!list.data) {
      list.data = []
    }

    if (!list.filters) {
      data.page = 0
      data.per_page = 20
      list.filters = data
    } else {
      data = list.filters
      data.page = data.page + 1
    }

    if (!list.more) {
      list.more = true
    }

    dispatch({
      type: 'SET_PEOPLE_LIST',
      name,
      filters: list.filters,
      data: list.data,
      loading: true,
      more: true
    })

    API.loadFans({
      accessToken,
      data,
      callback:(err, result)=>{

        callback(err, result)

        if (!result.success) {
          return
        }

        let more =  result.data.length < data.per_page ? false : true

        list.data = list.data.concat(result.data)

        list.filters.page = list.filters.page + 1

        dispatch({
          type: 'SET_PEOPLE_LIST',
          name,
          filters: list.filters,
          data: list.data,
          loading: false,
          more: more
        })

      }
    })

  }
}

/*
export function loadFollowPeoples({ userId, page, perPage, callback = ()=>{} }) {
  return (dispatch, getState) => {

    var data = {
      user_id: userId,
      page: page,
      per_page: perPage
    }

    let accessToken = getState().sign.accessToken

    API.loadFollowPeoples({ accessToken, data, callback })
  }
}


export function loadFans({ userId, page, perPage, callback = ()=>{} }) {
  return (dispatch, getState) => {

    var data = {
      user_id: userId,
      page: page,
      per_page: perPage
    }

    let accessToken = getState().sign.accessToken

    API.loadFans({ accessToken, data, callback })
  }
}
*/
