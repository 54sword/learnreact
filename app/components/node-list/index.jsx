import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import arriveFooter from '../../common/arrive-footer'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadNodes } from '../../actions/nodes'
import { getNodes, getLoading, getMore } from '../../reducers/nodes'

import NodeItem from '../node-item'

class FollowNodesList extends Component {

  constructor(props) {
    super(props)

    const { name, userId } = this.props

    this.state = {
      name: name,
      page: 0,
      perPage: 20,
      userId: userId,
    }
    this.triggerLoad = this._triggerLoad.bind(this)
  }

  componentDidMount() {

    const self = this

    const { nodes } = this.props
    const { name } = this.state

    if (nodes.length == 0) {
      self.triggerLoad()
    }

    arriveFooter.add(name, ()=>{
      self.triggerLoad()
    })

  }

  componentWillUnmount() {
    arriveFooter.remove(name)
  }

  _triggerLoad(callback) {
    const { loadNodes } = this.props
    const { name, page, perPage, userId } = this.state

    var data = {
      page: page,
      per_page: perPage,
      child: 1
    }

    if (userId) {
      data.people_id = userId
    }

    loadNodes({
      name,
      data,
      callback: function(err, result){
      }
    })

  }

  render () {
    const { nodes, loading, more } = this.props

    return (<div className="container">
      <ul>
        {nodes.map((node, index) => {
          return(<li key={node._id}>
            <Link to={`/topic/${node._id}`}><NodeItem node={node} /></Link>
          </li>)
        })}
        {loading ? 'loading...' : null}
        {!more ? '没有更多了' : null}
      </ul>
    </div>)
  }

}

FollowNodesList.propTypes = {
  loadNodes: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  more: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    nodes: getNodes(state, props.name),
    loading: getLoading(state, props.name),
    more: getMore(state, props.name)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadNodes: bindActionCreators(loadNodes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowNodesList)
