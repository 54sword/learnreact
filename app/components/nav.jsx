
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexLink, IndexRoute, browserHistory } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../actions'

import styles from '../static/css/modules/header.scss'

// import './nav.scss';
import Sign from './sign';

var webapi = require('../utils/api')

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleSignpout = this.handleSignpout.bind(this)
    this.signout = this.signout.bind(this)
    this.showSigninBox = this.showSigninBox.bind(this)
    // this.activeNav = this.activeNav.bind(this)
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

    let me
    /*
    if (user.userinfo) {
      navbarRight = (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">提问</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              {user.userinfo.nickname}
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/me">个人主页</Link></li>
              <li><a href="#">设置</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="javascript:;" onClick={this.handleSignpout}>退出</a></li>
            </ul>
          </li>
        </ul>
      )

    } else {
      navbarRight = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <button type="button" className="btn btn-link" data-toggle="modal" data-target="#myModal">登录/注册</button>
          </li>
        </ul>
      )
    }
    */

    if (user.userinfo) {
      me = (<li><Link to="/me" activeClassName={styles.active}>{user.userinfo.nickname}</Link></li>)
    } else {
      me = (<li><a href="#" onClick={this.showSigninBox}>我的</a></li>)
    }

    // onClick={this.showSigninBox}

    // initUserInfo={this.initUserInfo}

    return (
      <div>
        <div className={styles.header}>
          <div>
            <ul>
              <li><IndexLink to="/" activeClassName={styles.active}>问答</IndexLink></li>
              <li><a href="#">主题</a></li>
              <li><Link to="/topic" activeClassName={styles.active}>找人</Link></li>
              {me}
            </ul>
          </div>
        </div>
        {user.showSigninBox ?
          <Sign user={user} actions={actions} showSigninBox={this.showSigninBox} /> : ''
        }
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
