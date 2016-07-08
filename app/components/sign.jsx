import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import './sign.scss';
import '../static/js/libs/jquery.cookie.js';
import { Link, browserHistory } from 'react-router';

import Signin from './signin';
import Signup from './signup';

class Sign extends React.Component {

  constructor(props) {
    super(props)
    this.addToken = this.addToken.bind(this)
  }

  addToken (token) {
    const { actions } = this.props
    actions.setToken(token)
  }

  render () {

    const { user, actions, showSigninBox, initUserInfo } = this.props

    let sign = (
      <div id="sign">
        <div>
          登录
          <a href="javascript:;" onClick={this.props.showSigninBox}>关闭</a>
        </div>
        <Signin
          user={user}
          actions={actions}
          setToken={actions.setToken}
          showSigninBox={showSigninBox}
          initUserInfo={initUserInfo}
        />
        <Signup />
        <div>
          第三方账号登录：
          <ul>
            <li onClick={this.addTest}>微信</li>
            <li>微博</li>
            <li>QQ</li>
          </ul>
        </div>
      </div>
    )

    return sign
  }
}


Sign.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default Sign;
