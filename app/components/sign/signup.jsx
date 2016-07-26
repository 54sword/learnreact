import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory } from 'react-router'

var webapi = require('../../utils/api')

export default class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.signup = this.signup.bind(this)
  }

  componentWillMount() {
    // 如果已经登录，那么验证token是否有效，如果有效则跳转到首页
    // if ($.cookie('accessToken')) {
      // browserHistory.push('./');
    // }
  }

  signup(event) {

    event.preventDefault();

    let { nickname, email, password, male } = this.refs

    webapi.signup({
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      gender: male.checked ? 1 : 0
    }, function(err, result){

      if (err) console.log(err);
      if (result.success) {
        alert('注册成功')
      } else {
        console.log('111')
        console.log(result.error)
      }
      // console.log(result);
    });

    return false
  }

  render () {

    return (
      <form onSubmit={this.signup}>
        <h6>注册</h6>
        <div>昵称 <input type="text" ref="nickname" /></div>
        <div>邮箱 <input type="text" ref="email" /></div>
        <div>密码 <input type="password" ref="password" /></div>
        <div>性别
          <input type="radio" name="gender" ref="male" />男
          <input type="radio" name="gender" />女
        </div>
        <div><input type="submit" value="注册" /></div>
      </form>
    )
  }

}
