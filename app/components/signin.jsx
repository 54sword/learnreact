import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

// import { signin } from '../utils/api'
var webapi = require('../utils/api')

class Signin extends React.Component {

  constructor(props) {
    super(props)
    this.signin = this.signin.bind(this)
    // this.getUserInfo = this.getUserInfo.bind(this)
  }

  /*
  componentWillMount() {
    if ($.cookie('accessToken')) {
      this.props.setToken($.cookie('accessToken'))
      this.getUserInfo()
    }
  }
  */

  signin(event) {

    event.preventDefault();

    const { user, actions } = this.props

    var _self = this;

    var $email = this.refs.signinAccount;
    var $password = this.refs.signinPassword;

    webapi.signin($email.value, $password.value, function(err, result){

      if (err) {
        console.log(err)
        return
      }

      if (result.success) {
        actions.setToken(result.data.access_token)
        location.reload()
        // _self.props.initUserInfo();
      }
    })


    // console.log(actions.signin($email.value, $password.value))

    // actions.signin($email.value, $password.value);

    return;

    if ($email.value == '') {
      $email.focus();
    } else if ($password.value == '') {
      $password.focus();
    } else {
      $.ajax({
        url: 'http://localhost:3000/api/v1/signin',
        type: 'post',
        data: {
          email: $email.value,
          password: $password.value
        },
        error(err) {
          var data = err.responseJSON;
          alert(data.error);
        },
        success(result) {
          _self.props.setToken(result.data.access_token)
          _self.props.initUserInfo();
          // _self.getUserInfo()
        }
      });
    }

    return false;
  }

  /*
  getUserInfo () {

    let _self = this

    const { user, actions } = this.props

    if (user.token) {
      $.ajax({
        url: 'http://localhost:3000/api/v1/user',
        type: 'post',
        data: {
          token: user.token
        },
        error() {
          // _self.signout();
        },
        success(result) {
          if (result.success) {
            actions.setUser(result.data.user)
            _self.props.showSigninBox()
          }
        }
      });
    }

  }
  */

  render () {

    return (
      <form id="signin" onSubmit={this.signin}>
        <h1>登录1</h1>
        <p>邮箱 <input type="text" ref="signinAccount" /></p>
        <p>密码 <input type="password" ref="signinPassword" /></p>
        <p><input type="submit" value="登录" /></p>
      </form>
    )
  }
}

Signin.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default Signin
