import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../../actions'

import Nav from '../../components/nav'

let webapi = require('../../utils/api')

class Me extends React.Component {

  constructor(props) {
    super(props)
    this.signout = this.signout.bind(this)
  }

  signout() {
    if (window.confirm('确认退出？')) {
      const { user, actions } = this.props
      actions.removeToken();
      location.href = '/';
    }
  }

  componentWillMount() {

  }

  render () {

    const { user, actions } = this.props

    return (
      <div>
        <Nav />
        <img src={user.userinfo.avatar_url} />
        <div>{user.userinfo.nickname}</div>
        <div>{user.userinfo.brief}</div>
        <div><button type="type" className="btn" onClick={this.signout}>退出</button></div>
      </div>
    );
  }

}


Me.propTypes = {
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
)(Me)
