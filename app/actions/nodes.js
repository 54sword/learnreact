import * as API from '../api/nodes'

/*
function addNodes(nodes) {
  return { type: 'ADD_NODES', nodes }
}

export function loadNodes(data = {}, callback = ()=>{}) {
  return (dispatch, getState) => {
    const accessToken = getState().sign.accessToken
    API.fetchNodes({ accessToken, data, callback })
  }
}
*/

export function followNode({ id, callback }) {
  return (dispatch, getState) => {
    const accessToken = getState().sign.accessToken
    API.followNode({
      id,
      accessToken,
      callback:(err, result)=>{

        // console.log(result)

        // if (result && result.success) {
          dispatch({ type: 'FOLLOW_NODE', nodeId: id, status: true })
        // }

      }
    })
  }
}

export function unfollowNode({ id, callback }) {
  return (dispatch, getState) => {
    const accessToken = getState().sign.accessToken
    API.unfollowNode({
      id,
      accessToken,
      callback:(err, result)=>{

        // console.log(result)

        // if (result && result.success) {
          dispatch({ type: 'FOLLOW_NODE', nodeId: id, status: false })
        // }

      }
    })
  }
}


// function setNodeList(nodes) {
export function loadNodes({ name, data = {}, callback = ()=>{} }) {
  return (dispatch, getState) => {

    const accessToken = getState().sign.accessToken
    const nodeList = getState().nodes[name] || {}

    if (typeof(nodeList.more) != 'undefined' && !nodeList.more ||
      nodeList.loading
    ) {
      return
    }

    if (!nodeList.data) {
      nodeList.data = []
    }

    if (!nodeList.filters) {
      data.page = 0
      data.per_page = 20
      nodeList.filters = data
    } else {
      data = nodeList.filters
      data.page = data.page + 1
    }

    if (!nodeList.more) {
      nodeList.more = true
    }

    dispatch({
      type: 'SET_NODE_LIST',
      name,
      filters: nodeList.filters,
      data: nodeList.data,
      loading: true,
      more: true
    })

    API.fetchNodes({
      accessToken,
      data,
      callback:(err, result)=>{

        callback(err, result)

        if (!result.success) {
          return
        }

        let more =  result.data.length < data.per_page ? false : true

        nodeList.data = nodeList.data.concat(result.data)

        nodeList.filters.page = nodeList.filters.page + 1

        dispatch({
          type: 'SET_NODE_LIST',
          name,
          filters: nodeList.filters,
          data: nodeList.data,
          loading: false,
          more: more
        })

      }
    })

  }
}
