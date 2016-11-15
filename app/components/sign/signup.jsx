import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.submitSignup = this.submitSignup.bind(this)
    this.singupFailed = this.singupFailed.bind(this)
    this.sendCaptcha = this.sendCaptcha.bind(this)
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

    let { nickname, email, password, male, female, captcha } = this.refs

    const { signup } = this.props

    if (!nickname.value) {
      nickname.focus()
      return
    } else if (!email.value) {
      email.focus()
      return
    } else if (!captcha.value) {
      captcha.focus()
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
      gender: male.checked ? 1 : 0,
      source: 0,
      captcha: captcha.value
    }, function(err, result){
      if (err) {
        self.singupFailed(err.data);
      } else if (!err && result.success) {
        alert('注册成功')
      }
    });
  }

  sendCaptcha() {
    const { addCaptcha } = this.props
    const { email } = this.refs

    if (!email.value) {
      email.focus()
      return
    }

    addCaptcha({
      email: email.value,
      type: 'signup'
    }, function(err,result){
      console.log(err, result)
    })

  }

  render () {
    return (
      <form onSubmit={this.submitSignup}>
        <h6>注册</h6>
        <div><input type="text" className="input" ref="nickname" placeholder="昵称" /><div ref="nickname-meg"></div></div>
        <div><input type="text" className="input" ref="email" placeholder="邮箱" /><div ref="email-meg"></div></div>
        <div>
          <input type="text" className="input" styleName="captcha" placeholder="请输入验证码" ref="captcha" />
          <input type="submit" className="button" styleName="get-captcha-button" value="获取验证码" onClick={this.sendCaptcha} />
        </div>
        <div><input type="password" className="input" ref="password" placeholder="密码" /><div ref="password-meg"></div></div>
        <div>性别
          <input type="radio" name="gender" ref="male" />男
          <input type="radio" name="gender" ref="female" />女
          <div ref="gender-meg"></div>
        </div>
        <div><input type="submit" className="button" value="注册" /></div>
      </form>
    )
  }

}

Signup = CSSModules(Signup, styles)

export default Signup
