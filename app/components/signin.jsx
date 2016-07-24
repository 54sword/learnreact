import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

// import { signin } from '../utils/api'
var webapi = require('../utils/api')

class Signin extends React.Component {

  constructor(props) {
    super(props)
    // this.signin = this.signin.bind(this)
  }

  signin(event) {

    event.preventDefault();

    const { user, actions } = this.props

    var _self = this;

    var $email = this.refs.signinAccount;
    var $password = this.refs.signinPassword;

    webapi.signin($email.value, $password.value, function(err, result){

      if (err) {
        console.log(err)
        return;
      }

      if (result.success) {
        actions.setToken(result.data.access_token)
        location.reload()
      }
    })

    return false;
  }

  render () {

    return (
      <form onSubmit={this.signin.bind(this)}>
        <h6>登录</h6>
        <div>邮箱 <input type="text" ref="signinAccount" /></div>
        <div>密码 <input type="password" ref="signinPassword" /></div>
        <div><input type="submit" value="登录" /></div>
      </form>
    )
  }
}

Signin.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default Signin
