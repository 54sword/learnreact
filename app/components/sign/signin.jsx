import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

export default class Signin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      errorTips: {
        'error signin failde': '账号或密码错误',
        'email blank': '邮箱地址未填写'
      }
    }
    this.signin = this.signin.bind(this)
    this.toForgot = this.toForgot.bind(this)
  }

  signin(event) {

    event.preventDefault();

    const { signin } = this.props

    let _self = this;
    let $email = this.refs.account
    let $password = this.refs.password
    let $submit = this.refs.submit

    if (!$email.value) {
      $email.focus()
      return
    }

    if (!$password.value) {
      $password.focus()
      return
    }

    $submit.value = '登录中...'
    $submit.disabled = true

    signin($email.value, $password.value, function(err, result){

      $submit.value = '登录'
      $submit.disabled = false

      if (!result.success) {
        _self.setState({ error: result.error })
        return;
      }

      location.reload()

    });

    return false;
  }

  toForgot () {
    this.props.hideSign()
    browserHistory.push('/forgot')
  }

  render () {

    let error

    if (this.state.error) {
      error = this.state.errorTips[this.state.error] ? this.state.errorTips[this.state.error] : this.state.error
    }

    return (
      <form onSubmit={this.signin}>
        {error}
        <h6>登录</h6>
        <div><input type="text" className="input" ref="account" placeholder="邮箱" /></div>
        <div><input type="password" className="input"  ref="password" placeholder="密码" /></div>
        <div><input type="submit" ref="submit" className="button" value="登录" /></div>
        <a href="javascript:void(0);" onClick={this.toForgot}>忘记密码？</a>
      </form>
    )
  }
}
