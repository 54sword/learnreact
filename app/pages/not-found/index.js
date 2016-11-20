import React, { Component } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './style.scss'

import Subnav from '../../components/subnav'
// import Shell from '../../shell'

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

    // const { notices } = this.state
    // let notice = ''
    //
    // if (this.props && this.props.location.query.notice) {
    //   notice = this.props.location.query.notice
    // }
    //
    // this.props.setMeta({
    //   title: notice && notices[notice] ? notices[notice] : '不存在这个页面'
    // })
  }

  render () {

    const { notices } = this.state
    let notice = ''

    if (this.props && this.props.location.query.notice) {
      notice = this.props.location.query.notice
    }

    return (
      <div styleName="text">
        {notice && notices[notice] ? notices[notice] : '不存在这个页面'}
        <div>
          <Link to="/">返回首页</Link>
        </div>
      </div>
    )
  }
}

NotFound = CSSModules(NotFound, styles)

export default NotFound
