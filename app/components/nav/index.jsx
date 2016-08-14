
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import styles from './index.scss'

import Sign from '../sign'

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignpout = this.handleSignpout.bind(this)
    this.signout = this.signout.bind(this)
    this.showSigninBox = this.showSigninBox.bind(this)
  }

  componentWillMount() {
  }

  signout() {
    const { actions } = this.props
    actions.removeToken();
    location.reload()
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
    //  onClick={this.showSigninBox}

    if (user.userinfo) {
      me = (<li><Link to="/me" activeClassName={styles.active}>{user.userinfo.nickname}</Link></li>)
    } else {
      me = (<li><a href="#" onClick={this.showSigninBox}>我的</a></li>)
    }

    return (
      <div>
        <div className={styles.header}>
          <div>
            <ul>
              <li><IndexLink to="/" activeClassName={styles.active}>问答</IndexLink></li>
              <li><Link to="/topic">主题</Link></li>
              <li><Link to="/find" activeClassName={styles.active}>找人</Link></li>
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
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
