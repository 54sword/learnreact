import React, { Component } from 'react'
// import { Link } from 'react-router'

import Tips from '../../components/tips'
import Shell from '../../shell'

class NotFound extends Component {

  constructor(props) {
    super(props)

    this.state = {
      notices: {
        'wrong_token': '无效的 access token',
        'binding_failed': '绑定失败',
        'has_been_binding': '绑定失败，社交账号已被绑定',
        'binding_finished': '绑定完成',
        'create_user_failed': '创建用户失败',
        'create_oauth_failed': '创建账号失败'
      }
    }
  }

  componentWillMount() {

    if (!this.props.setMeta) {
      return
    }

    const { notices } = this.state
    let notice = ''

    if (this.props && this.props.location.query.notice) {
      notice = this.props.location.query.notice
    }

    this.props.setMeta({
      title: notice && notices[notice] ? notices[notice] : '不存在这个页面'
    })
  }

  render () {

    const { notices } = this.state
    let notice = ''

    if (this.props &&
        this.props.location &&
        this.props.location.query &&
        this.props.location.query.notice) {
      notice = this.props.location.query.notice
    }

    return (
      <Tips title={notice && notices[notice] ? notices[notice] : null} />
    )
  }
}

export default Shell(NotFound)
