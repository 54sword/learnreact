import * as API from '../api/nodes'

function addNodes(nodes) {
  return { type: 'ADD_NODES', nodes }
}

export function loadNodes(data = {}, callback = ()=>{}) {
  return (dispatch, getState) => {
    const accessToken = getState().sign.accessToken
    API.fetchNodes({ accessToken, data, callback })
  }
}

export function followNode({ id, callback }) {
  return (dispatch, getState) => {
    const accessToken = getState().sign.accessToken
    API.followNode({ id, accessToken, callback })
  }
}

export function unfollowNode({ id, callback }) {
  return (dispatch, getState) => {
    const accessToken = getState().sign.accessToken
    API.unfollowNode({ id, accessToken, callback })
  }
}
