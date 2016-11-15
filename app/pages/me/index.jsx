import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Nav from '../../components/nav'

class Me extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { user } = this.props

    return (
      <div>
        <Nav />
        <div className="container">

          <div styleName="header">
            <img src={user.avatar_url.replace(/thumbnail/, "large")} />
            <div>{user.nickname}</div>
            {/*
            <br />
            <div styleName="follow">
              <div><b>{user.follow_count}</b><br /><span>关注</span></div>
              <div><b>{user.node_follow_count}</b><br /><span>关注话题</span></div>
              <div><b>{user.fans_count}</b><br /><span>关注者</span></div>
            </div>
            */}
          </div>

          <div className="list">
            <Link className="arrow" to="/me/questions">我的主题 <span className="right">{user.question_count}</span></Link>
            <Link className="arrow" to="/me/answers">我编写的答案 <span className="right">{user.comment_total}</span></Link>
          </div>

          <div className="list">
            <Link className="arrow" to="/me/follow-nodes">我关注的话题
              <span className="right">{user.follow_node_count}</span>
            </Link>
            <Link className="arrow" to="/me/follow-peoples">我关注的人
              <span className="right">{user.follow_people_count}</span>
            </Link>
            <Link className="arrow" to="/me/fans">我的粉丝
              <span className="right">{user.fans_count}</span>
            </Link>
          </div>

          <div className="list">
            <Link className="arrow" to="/settings">设置</Link>
          </div>

        </div>
      </div>
    )

  }

}

Me.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

Me = CSSModules(Me, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Me)
