import React, { Component, PropTypes } from 'react'

import Signin from './signin'
import Signup from './signup'

import styles from './index.scss'

var webapi = require('../../utils/api')

class Sign extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {

    const { user, actions, showSigninBox, initUserInfo } = this.props

    return (<div>
      <div className={styles.mark} onClick={showSigninBox}></div>
      <div className={styles.signLayer}>
        <div className={styles.closeButton}>
          <a href="javascript:;" onClick={showSigninBox}>x</a>
        </div>
        <div className={styles.social}>
          <ul>
            <li><a href="#">微信</a></li>
            <li><a href="#">微博</a></li>
            <li><a href="#">QQ</a></li>
          </ul>
        </div>
        <div className={styles.signin}>
          <Signin signin={actions.signin} />
        </div>
        <Signup />
      </div>
    </div>)
  }
}


Sign.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default Sign;
