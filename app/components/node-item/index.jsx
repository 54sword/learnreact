import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import FollowNode from './components/follow'

class NodeItem extends Component {

  constructor(props) {
    super(props)
    const { node } = this.props
    this.state = {
      node: node
    }
    this.callback = this.callback.bind(this)
  }

  callback(status) {
    const { node } = this.state

    node.follow_count += status ? 1 : -1
    node.follow = status

    this.setState({
      node: node
    })
  }

  render () {

    const { node } = this.props

    return (<div styleName="item">
              <span styleName="follow">
                <FollowNode
                  node={node}
                />
              </span>
              <img styleName="avatar" src={node.avatar_url} />
              <div styleName="name">{node.name}</div>
              <div>{node.brief}</div>
              <div styleName="count">
                <span>{node.follow_count} 位成员</span>
                <span>{node.question_count} 个主题</span>
                <span>{node.comment_count} 个答案</span>
              </div>
            </div>)
  }

}

NodeItem = CSSModules(NodeItem, styles)
export default NodeItem
