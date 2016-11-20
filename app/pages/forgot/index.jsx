import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'
import { sendEmailCaptcha, resetPasswordByCaptcha } from '../../actions/account'
import { addCaptcha }  from '../../actions/captcha'

import Shell from '../../shell'
import Subnav from '../../components/subnav'

class Forgot extends Component {

  constructor(props) {
    super(props)
    this.submitResetPassword = this.submitResetPassword.bind(this)
    this.fetchCaptcha = this.fetchCaptcha.bind(this)
  }

  componentWillMount() {

    this.props.setMeta({
      title: '忘记密码'
    })

  }

  submitResetPassword() {
    const { email, captcha, newPassword, confirmNewPassword } = this.refs
    const { resetPasswordByCaptcha } = this.props

    if (!email.value) {
      email.focus()
      return
    }

    if (!captcha.value) {
      captcha.focus()
      return
    }

    if (!newPassword.value) {
      newPassword.focus()
      return
    }

    if (!confirmNewPassword.value) {
      confirmNewPassword.focus()
      return
    }

    if (newPassword.value != confirmNewPassword.value) {
      alert('两次密码输入不一致')
      return
    }

    resetPasswordByCaptcha({
      email: email.value,
      captcha: captcha.value,
      newPassword: newPassword.value,
      callback: function(err, result) {

      }
    })

  }

  fetchCaptcha() {

    const { email, captcha } = this.refs
    const { addCaptcha } = this.props

    if (!email.value) {
      email.focus()
    }

    addCaptcha({
      email: email.value,
      type: 'forgot'
    }, function(err, result){
      console.log(err)
      console.log(result)
    })

  }

  render() {

    const { user } = this.props

    return (
      <div>
        <Subnav middle="找回密码" />
        <div className="container">

          <div className="list">
            <input type="text" placeholder="请输入你的注册邮箱" ref="email" />
            <div>
              <input type="text" placeholder="输入验证码" ref="captcha" />
              <input type="submit" value="获取验证码" onClick={this.fetchCaptcha} />
            </div>
            <input type="password" placeholder="新密码" ref="newPassword" />
            <input type="password" placeholder="重复新密码" ref="confirmNewPassword" />
          </div>

          <div className="list">
            <input type="submit" className="button center" onClick={this.submitResetPassword} value="提交" />
          </div>

        </div>
      </div>
    )

  }

}

Forgot.propTypes = {
  user: PropTypes.object.isRequired,
  sendEmailCaptcha: PropTypes.func.isRequired,
  resetPasswordByCaptcha: PropTypes.func.isRequired,
  addCaptcha: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendEmailCaptcha: bindActionCreators(sendEmailCaptcha, dispatch),
    resetPasswordByCaptcha: bindActionCreators(resetPasswordByCaptcha, dispatch),
    addCaptcha: bindActionCreators(addCaptcha, dispatch)
  }
}

Forgot = CSSModules(Forgot, styles)

Forgot = connect(mapStateToProps, mapDispatchToProps)(Forgot)

export default Shell(Forgot)
