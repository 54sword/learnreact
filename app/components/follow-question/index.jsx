import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { follow, cancelFollow } from '../../actions/follow-question'
import { getUserInfo } from '../../reducers/user'


class FollowQuestion extends Component {

  constructor(props) {
    super(props)

    const { questionId, count, status, autherId } = this.props

    this.state = {
      count: count || 0,
      status: status || false,
      questionId: questionId,
      autherId: autherId
    }

    this.follow = this.follow.bind(this)
    this.cancelFollow = this.cancelFollow.bind(this)
  }

  follow() {
    const { follow } = this.props
    const { questionId } = this.state
    const self = this
    follow(questionId, function(err, result){
      if (result && result.success) {
        self.setState({
          count: self.state.count + 1,
          status: true
        })
      }
    })
  }

  cancelFollow() {
    const { cancelFollow } = this.props
    const { questionId } = this.state
    const self = this
    cancelFollow(questionId, function(err, result){
      if (result && result.success) {
        self.setState({
          count: self.state.count - 1,
          status: false
        })
      }
    })
  }

  render() {

    const { count, status, autherId } = this.state
    const { peopleProfile } = this.props

    if (!peopleProfile._id || autherId == peopleProfile._id) {
      return(<span></span>)
    }

    if (status) {
      return (<span onClick={this.cancelFollow}>取消关注 {count > 0 ? count : null}</span>)
    } else {
      return (<span onClick={this.follow}>关注问题 {count > 0 ? count : null}</span>)
    }

  }
}

FollowQuestion.propTypes = {
  peopleProfile: PropTypes.object.isRequired,

  follow: PropTypes.func.isRequired,
  cancelFollow: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    peopleProfile: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    follow: bindActionCreators(follow, dispatch),
    cancelFollow: bindActionCreators(cancelFollow, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowQuestion)
