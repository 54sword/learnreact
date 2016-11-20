import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signout } from '../../actions/sign'
import { getUserInfo } from '../../reducers/user'
import { loadUserInfo } from '../../actions/user'
import { sendEmailVerifyCaptcha, checkEmailVerifyCaptcha } from '../../actions/account'

import Subnav from '../../components/subnav'

import Shell from '../../shell'

class ResetEmail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
    this.submit = this.submit.bind(this)
    this.sendVerifyCode = this.sendVerifyCode.bind(this)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '验证邮箱'
    })
  }

  componentDidMount() {
    const { code } = this.refs
    code.focus()
  }

  submit() {

    const self = this
    const { checkEmailVerifyCaptcha, loadUserInfo } = this.props
    const { code } = this.refs

    if (!code.value) {
      code.focus()
      return
    }

    checkEmailVerifyCaptcha({ captcha: code.value, callback: function(){

    } })


    /*
    changeNickname({
      nickname: nickname.value,
      callback: function(err){
        if (err) {
          alert(err.error)
        } else {
          alert('昵称修改成功')
          loadUserInfo({})
          self.context.router.goBack()
        }
      }
    })
    */

  }

  sendVerifyCode() {

    const { sendEmailVerifyCaptcha } = this.props

    sendEmailVerifyCaptcha({
      callback: function() {
        // console.log('12311')
      }
    })

    /*
    const { code } = this.refs

    if (!code.value) {
      code.focus()
      return
    }
    */

  }

  render() {

    const { disabled } = this.state
    const { user } = this.props

    return (
      <div>
        <Subnav
          middle="验证邮箱"
        />
        <div className="container">

          <div className="list">
            <div className="center text">您的 {user.email} 邮箱还未验证，验证后将开启所有功能</div>
          </div>

          <div className="list">
            <div>
              <input type="text" placeholder="输入6位数验证码" ref="code" />
              <input type="submit" onClick={this.sendVerifyCode} value="获取验证码" disabled={disabled} />
            </div>
          </div>

          <div className="list">
            <input type="submit" className="button center" onClick={this.submit} value="提交" />
          </div>

        </div>
      </div>
    )

  }

}

ResetEmail.contextTypes = {
  router: PropTypes.object.isRequired
}

ResetEmail.propTypes = {
  user: PropTypes.object.isRequired,
  sendEmailVerifyCaptcha: PropTypes.func.isRequired,
  checkEmailVerifyCaptcha: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
    sendEmailVerifyCaptcha: bindActionCreators(sendEmailVerifyCaptcha, dispatch),
    checkEmailVerifyCaptcha: bindActionCreators(checkEmailVerifyCaptcha, dispatch)
  }
}

ResetEmail = connect(mapStateToProps, mapDispatchToProps)(ResetEmail)

export default Shell(ResetEmail)
