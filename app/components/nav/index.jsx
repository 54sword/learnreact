import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo, getUnreadNotice } from '../../reducers/user'
import { isSignin } from '../../reducers/sign'
import { showSign } from '../../actions/sign'

class Navbar extends Component {

  constructor(props) {
    super(props)
  }



  render() {

    const { user, isSignin, showSign, unreadNotice } = this.props

    let me

    if (isSignin) {
      me = <li><Link to="/me" activeClassName={styles.active}>{user.nickname}</Link></li>
    } else {
      me = <li><a href="javascript:void(0)" onClick={showSign}>我的</a></li>
    }

    return (
      <div>
        <div styleName="header">
          <div>
            <ul className={isSignin ? null : "three"}>
              <li><IndexLink to="/" activeClassName={styles.active}>首页</IndexLink></li>
              <li><Link to="/topics" activeClassName={styles.active}>社群</Link></li>
              {isSignin ? <li><Link to="/notifications" activeClassName={styles.active}>通知{unreadNotice > 0 ? unreadNotice : null}</Link></li> : null}
              {me}
            </ul>
          </div>
        </div>
        <div className={styles.placeholder}>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  isSignin: PropTypes.bool.isRequired,
  showSign: PropTypes.func.isRequired,
  unreadNotice: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    isSignin: isSignin(state),
    user: getUserInfo(state),
    unreadNotice: getUnreadNotice(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSign: bindActionCreators(showSign, dispatch)
  }
}

Navbar = CSSModules(Navbar, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
