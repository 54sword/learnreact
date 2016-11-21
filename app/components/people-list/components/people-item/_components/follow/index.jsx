import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { follow, unfollow, loadPeopleById } from '../../../../../../actions/peoples'
import { getUserInfo } from '../../../../../../reducers/user'
import { loadUserInfo } from '../../../../../../actions/user'
import { deleteQuestionList } from '../../../../../../actions/questions'

class FollowPeople extends Component {

  constructor(props) {
    super(props)

    const { people, callback } = this.props

    this.state = {
      people: people,
      callback: callback || function(){} // 执行关注后，回调的状态
    }
    this.triggerFollow = this.triggerFollow.bind(this)
  }

  triggerFollow(e) {

    e.preventDefault()

    const { unfollow, follow,
      loadPeopleById, loadUserInfo, deleteQuestionList
    } = this.props

    const { people, callback } = this.state

    const handleFollow = people.follow ? unfollow : follow

    handleFollow({
      userId: people._id,
      callback: (err, result) => {

        if (!err && result.success) {
          deleteQuestionList({ name: 'home' })
          callback(people.follow ? false : true)
        }

      }
    })

  }

  render() {

    const { me } = this.props
    const { people } = this.state

    if (!me._id || people._id == me._id) {
      return
    }

    return (
      <input
        className="button"
        onClick={this.triggerFollow}
        type="submit"
        value={people.follow ? "已关注"+(people.gender == 1 ? '他' : '她') : "+关注"+(people.gender == 1 ? '他' : '她')}
      />
    )
  }

}


FollowPeople.propTypes = {
  // followStatus: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,

  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  // loadFollowPeoples: PropTypes.func.isRequired,
  // loadPeopleById: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
  deleteQuestionList: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    // followStatus: getFollowStatusByPeopleId(state, props.people._id),
    me: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    follow: bindActionCreators(follow, dispatch),
    unfollow: bindActionCreators(unfollow, dispatch),
    // loadFollowPeoples: bindActionCreators(loadFollowPeoples, dispatch),
    // loadPeopleById: bindActionCreators(loadPeopleById, dispatch),
    loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
    deleteQuestionList: bindActionCreators(deleteQuestionList, dispatch)
  }
}

FollowPeople = CSSModules(FollowPeople, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowPeople)
