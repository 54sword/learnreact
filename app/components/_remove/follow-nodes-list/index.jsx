import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { loadFollowNodes } from '../../actions/node-follow'
import { loadNodes } from '../../actions/nodes'

import FollowNode from '../follow-node'
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
    /*
    loadFollowNodes({
      page, perPage, userId, callback: function(err, nodes){

        self.setState({
          loading: false,
          more: nodes.length < perPage ? false : true,
          page: page+1,
          nodesList: nodesList.concat(nodes)
        })

      }
    })
    */
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
      <ul styleName="nodes">
            {nodesList.map((node, index) => {
              return(<li key={node._id}><NodeItem node={node} /></li>)
            })}
            {loading ? 'loading...' : null}
            {!more ? '没有更多了' : null}
          </ul>
    </div>)
    /*
    return (<div className="container">
      <ul styleName="nodes">
            {nodesList.map((node, index) => {
              return(<li key={node._id}>
                <Link to={`/topic/${node._id}`}>
                  <span styleName="follow">
                    <FollowNode
                      node={node}
                      callback={(followStatus)=>{ this.callback(index, followStatus) }}
                    />
                  </span>
                  <img styleName="avatar" src={node.avatar_url} />
                  <div styleName="nodeName">{node.name}</div>
                  <div>{node.brief}</div>
                  <div styleName="otherInfo">
                    <span>{node.follow_count} 人关注</span>
                    <span>{node.question_count} 个主题</span>
                    <span>{node.comment_count} 个答案</span>
                  </div>
                </Link>
              </li>)
            })}
            {loading ? 'loading...' : null}
            {!more ? '没有更多了' : null}
          </ul>
    </div>)
    */
  }

}

FollowNodesList.propTypes = {
  // loadFollowNodes: PropTypes.func.isRequired,
  loadNodes: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadNodes: bindActionCreators(loadNodes, dispatch),
    // loadFollowNodes: bindActionCreators(loadFollowNodes, dispatch)
  }
}

FollowNodesList = CSSModules(FollowNodesList, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowNodesList)
