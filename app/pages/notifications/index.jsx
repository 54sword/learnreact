import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadNotifications } from '../../actions/notification'

import Shell from '../../shell'
import Nav from '../../components/nav'

class Notifications extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
    this.load = this.load.bind(this)
  }

  componentWillMount() {
    this.load()

    this.props.setMeta({
      title: '通知'
    })

  }

  load() {
    const self = this
    const { loadNotifications } = this.props

    loadNotifications({}, function(result){
      if (result.success) {
        self.setState({
          list: result.data
        })
      } else {
        // console.log(err, result)
      }
    })
  }

  render () {

    const { list } = this.state

    return (
      <div>
        <Nav />
        <div className="container">
          通知
          {list.map(notice => {

            switch (notice.type) {
              case 'follow-you':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  关注了你
                </div>)

              case 'follow-question':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  关注了你的问题
                </div>)

              case 'reply':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  回复了你
                </div>)

              case 'comment':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  评论了你
                </div>)

              case 'answer':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  回答了你的问题
                </div>)

              case 'like-answer':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  赞了你的答案
                </div>)

              case 'like-comment':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>
                    {notice.sender_id.nickname}
                  </Link>
                  赞了你的评论
                </div>)

              case 'new-answer':
                return (<div key={notice._id}>
                  <Link to={`/people/${notice.sender_id._id}`}>{notice.sender_id.nickname}</Link> 回答了
                  <Link to={`/answer/${notice.answer_id._id}`}>{notice.question_id.title}</Link>
                </div>)
            }

          })}
        </div>
      </div>
    )
  }
}


Notifications.propTypes = {
  loadNotifications: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadNotifications: bindActionCreators(loadNotifications, dispatch)
  }
}

Notifications = CSSModules(Notifications, styles)

Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)

export default Shell(Notifications)
