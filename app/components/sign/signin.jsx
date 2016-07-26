import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
// var webapi = require('../../utils/api')

class Signin extends React.Component {

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

    signin($email.value, $password.value, function(err){

      $submit.value = '登录'
      $submit.disabled = false

      if (err) {
        _self.setState({ error: err })
        return;
      }

      location.reload()

    });

    /*
    webapi.signin($email.value, $password.value, function(err, result){

      $submit.value = '登录'
      $submit.disabled = false

      if (err) {
        _self.setState({ error: result.error })
        return;
      }

      if (result.success) {
        setToken(result.data.access_token)
        location.reload()
      }
    })
    */

    return false;
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
        <div>邮箱 <input type="text" ref="account" /></div>
        <div>密码 <input type="password" ref="password" /></div>
        <div><input type="submit" ref="submit" value="登录" /></div>
      </form>
    )
  }
}

export default Signin
