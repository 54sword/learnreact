import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory } from 'react-router'

var webapi = require('../../utils/api')

export default class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.submitSignup = this.submitSignup.bind(this)
    this.singupFailed = this.singupFailed.bind(this)
  }

  componentWillMount() {
    // 如果已经登录，那么验证token是否有效，如果有效则跳转到首页
    // if ($.cookie('accessToken')) {
      // browserHistory.push('./');
    // }
  }

  singupFailed(data) {

    let megs = {
      nickname: {
        'ok': ' ',
        'blank error': '请输入昵称'
      },
      email: {
        'ok': ' ',
        'invalid error': '邮箱格式错误',
        'blank error': '请输入你的电子邮箱'
      },
      password: {
        'ok': ' ',
        'invalid error': '密码格式错误',
        'blank error': '请输入密码'
      },
      gender: {
        'ok': ' ',
        'invalid error': '请选择性别',
        'blank error': '请选择性别'
      }
    }

    for (let key in data) {
      let ref = this.refs[key+'-meg']
      if (ref) {
        ref.innerHTML = megs[key][data[key]] || data[key]
      }
    }

  }

  submitSignup(event) {

    event.preventDefault();

    let self = this

    let { nickname, email, password, male, female } = this.refs

    const { signup } = this.props

    if (!nickname.value) {
      nickname.focus()
      return
    } else if (!email.value) {
      email.focus()
      return
    } else if (!password.value) {
      password.focus()
      return
    } else if (!male.checked && !female.checked) {
      self.singupFailed({gender: 'blank error'})
      return
    }

    // 注册
    signup({
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      gender: male.checked ? 1 : 0
    }, function(err, result){
      if (err) {
        self.singupFailed(err.data);
      } else if (!err && result.success) {
        alert('注册成功')
      }
    });

    // return false
  }

  render () {
    return (
      <form onSubmit={this.submitSignup}>
        <h6>注册</h6>
        <div>昵称 <input type="text" ref="nickname" /><div ref="nickname-meg"></div></div>
        <div>邮箱 <input type="text" ref="email" /><div ref="email-meg"></div></div>
        <div>密码 <input type="password" ref="password" /><div ref="password-meg"></div></div>
        <div>性别
          <input type="radio" name="gender" ref="male" />男
          <input type="radio" name="gender" ref="female" />女
          <div ref="gender-meg"></div>
        </div>
        <div><input type="submit" value="注册" /></div>
      </form>
    )
  }

}
