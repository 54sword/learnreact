
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../actions'

import './nav.scss';
import Sign from './sign';

var webapi = require('../utils/api')

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignpout = this.handleSignpout.bind(this)
    this.signout = this.signout.bind(this)
    this.showSigninBox = this.showSigninBox.bind(this)
    // this.initUserInfo = this.initUserInfo.bind(this)
  }
  /*
  initUserInfo() {
    let _self = this

    const { user, actions } = this.props

    let accessToken = $.cookie('accessToken') || null;

    if (accessToken) {
      webapi.fetchUserinfo(accessToken, function(err, data){
        actions.setUser(data.data.user)
        _self.setState()
      });
    }
  }
  */

  componentWillMount() {
    /*
    const { user, actions } = this.props

    if (!user.userinfo) {
      this.initUserInfo()
    }
    */

  }

  signout() {

    const { user, actions } = this.props

    actions.removeToken();
    // $.removeCookie('accessToken');

    location.reload()
    /*
    const { user, actions } = this.props
    actions.setUser(null)
    this.setState()
    */
  }

  handleSignpout() {
    if (window.confirm('确认退出？')) {
      this.signout();
    }
  }

  showSigninBox() {
    const { user, actions } = this.props
    actions.showSigninBox(user.showSigninBox ? false : true)
    this.setState()
  }

  render() {

    const { user, actions } = this.props

    let navbarRight

    if (user.userinfo) {
      navbarRight = (<ul>
        <li><a href="#">提问</a></li>
        <li>
          <img src={user.userinfo.avatar_url} width="30" />
          <Link to="/me" activeClassName="navbar-focus">
            {user.userinfo.nickname}
          </Link>
        </li>
        <li><a href="javascript:;" onClick={this.handleSignpout}>退出</a></li>
      </ul>)
    } else {
      navbarRight = (<div>
        <a href="javascript:;" onClick={this.showSigninBox}>登录/注册</a>
        {user.showSigninBox ? <Sign
          user={user}
          actions={actions}
          showSigninBox={this.showSigninBox}
          /> : ''}
      </div>)
    }

    // initUserInfo={this.initUserInfo}

    return (
      <div id="header">
        <div className="container">
          <div>
            <ul>
              <li><Link to="/" activeClassName="navbar-focus" onlyActiveOnIndex={true}>首页</Link></li>
              <li><Link to="/topic" activeClassName="navbar-focus">话题</Link></li>
            </ul>
          </div>
          <div className="navbar-right">
            {navbarRight}
          </div>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
