import React, { Component, PropTypes } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signin, signup, hideSign } from '../../actions/sign'
import { addCaptcha } from '../../actions/captcha'

import Signin from './signin'
import Signup from './signup'

class Sign extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {

    const { signin, signup, hideSign, addCaptcha } = this.props

    return (<div>
      <div styleName="mark" onClick={hideSign}></div>
      <div styleName="signLayer">
        <div styleName="closeButton">
          <a href="javascript:;" onClick={hideSign}></a>
        </div>
        <div styleName="social">
          <ul>
            <li><a href="http://api.xiaoduyu.com/oauth/weibo">微博</a></li>
            <li><a href="http://api.xiaoduyu.com/oauth/qq">QQ</a></li>
          </ul>
        </div>
        <Signin signin={signin} hideSign={hideSign} />
        <Signup signup={signup} hideSign={hideSign} addCaptcha={addCaptcha} />
      </div>
    </div>)
  }
}

Sign.propTypes = {
  signin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  hideSign: PropTypes.func.isRequired,
  addCaptcha: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signin: bindActionCreators(signin, dispatch),
    signup: bindActionCreators(signup, dispatch),
    hideSign: bindActionCreators(hideSign, dispatch),
    addCaptcha: bindActionCreators(addCaptcha, dispatch)
  }
}

Sign = CSSModules(Sign, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign)
