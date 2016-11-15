import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// import CSSModules from 'react-css-modules'
// import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadNodes } from '../../actions/nodes'

// import FollowNode from '../follow-node'
import NodeItem from '../node-item'

class FollowNodesList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nodesList: [],
      page: 0,
      perPage: 20,
      userId: this.props.userId,
      loading: false,
      more: true
    }
    this.triggerLoad = this.triggerLoad.bind(this)
    this.callback = this.callback.bind(this)
  }

  componentDidMount() {

    const self = this

    self.triggerLoad()

    // 监听滚动条是否
    var $window = $(window)
    var $document = $(document)
    $window.scroll(function(){
      if ($document.scrollTop() + $window.height() >= $document.height() - 150) {
        self.triggerLoad()
      }
    })

  }

  componentWillUnmount() {
    // 离开页面的时候，注意接触绑定的事件
    $(window).unbind('scroll')
  }

  triggerLoad(callback) {
    const { loadNodes } = this.props
    const { nodesList, page, perPage, userId, loading, more } = this.state
    const self = this

    if (!more || loading) {
      return
    }

    self.setState({
      loading: true
    })

    var data = {
      page: page,
      per_page: perPage,
      child: 1
    }

    if (userId) {
      data.people_id = userId
    }

    loadNodes(data, function(err, result){

      const nodes = result.data

      self.setState({
        loading: false,
        more: nodes.length < perPage ? false : true,
        page: page+1,
        nodesList: nodesList.concat(nodes)
      })

    })
  }

  callback (index, followStatus) {

    const { nodesList } = this.state

    nodesList[index].follow_count += followStatus ? 1 : -1
    nodesList[index].follow = followStatus

    this.setState({
      nodesList: nodesList
    })
  }

  render () {

    const { nodesList, loading, more } = this.state
    const self = this

    return (<div className="container">
      <ul>
        {nodesList.map((node, index) => {
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
  loadNodes: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadNodes: bindActionCreators(loadNodes, dispatch)
  }
}

// FollowNodesList = CSSModules(FollowNodesList, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowNodesList)
