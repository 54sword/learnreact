import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { followNode, unfollowNode } from '../../../../actions/nodes'
import { getUserInfo } from '../../../../reducers/user'
import { deleteQuestionList } from '../../../../actions/questions'

class FollowNode extends Component {

  constructor(props) {
    super(props)
    this.follow = this.follow.bind(this)
  }

  follow(e) {

    e.preventDefault()

    const { node, loadFollowNodes,
            unfollowNode, followNode, deleteQuestionList, callback
          } = this.props

    const handleFollow = node.follow ? unfollowNode : followNode

    handleFollow({
      id: node._id,
      callback: (err, result) => {}
    })

  }

  render() {

    const { node, peopleProfile } = this.props

    // 没有登录情况下不显示
    if (!peopleProfile._id) {
      return (<span></span>)
    }

    return (
      <input
        className="button"
        onClick={this.follow}
        type="submit"
        value={node.follow ? "已加入" : "加入"}
      />
    )
  }

}


FollowNode.propTypes = {
  peopleProfile: PropTypes.object.isRequired,
  followNode: PropTypes.func.isRequired,
  unfollowNode: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    peopleProfile: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    followNode: bindActionCreators(followNode, dispatch),
    unfollowNode: bindActionCreators(unfollowNode, dispatch),
    deleteQuestionList: bindActionCreators(deleteQuestionList, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowNode)
