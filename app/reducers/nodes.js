
import merge from 'lodash/merge'

let initialState = {
  other: [],
  main: []
}

export default function nodes(state = initialState, action) {

  switch (action.type) {

    case 'ADD_NODES':
      state['main'] = action.nodes
      return merge({}, state, {})

    case 'ADD_NODE':
      state['other'].push(action.node)
      return merge({}, state, {})

    default:
      return state
  }

}

export function getAllNodes(state) {
  /*
  let followNodes = {};
  for (let i in state.user.followNodes) {
    followNodes[state.user.followNodes[i]._id] = 1
  }


  let nodes = state.nodes['main']

  let magic = function(nodeId) {
    return followNodes[nodeId] ? true : false
  }

  nodes.map((node, key)=>{
    nodes[key].follow = magic(node._id)

    if (node.children.length > 0) {
      node.children.map((node, k) => {
        nodes[key].children[k].follow = magic(node._id)
      })
    }

  })
  */

  return state.nodes['main']
}


export function getNodeById(state, nodeId) {

  let nodes = state.nodes['main']
  let otherNodes = state.nodes['other']

  let run = (nodes) => {
    for (let i = 0, max = nodes.length; i < max; i++) {
      if (nodes[i]._id == nodeId) {
        return nodes[i]
      } else if (nodes[i].children.length > 0) {
        return run(nodes[i].children)
      }
    }
    return null
  }

  let result = run(nodes)

  if (!result) {
    result = run(otherNodes)
  }

  /*
  if (result) {

    let followNodes = {};

    for (let i in state.user.followNodes) {
      followNodes[state.user.followNodes[i]._id] = 1
    }

    result.follow = followNodes[result._id] ? true : false
  }
  */

  return result ? [result] : []

  // return { item: result } || {item: null}
}
