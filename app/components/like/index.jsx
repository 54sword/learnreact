import React, { Component, PropTypes } from 'react'
// import ReactDOM from 'react-dom'
import { Link } from 'react-router'

// import CSSModules from 'react-css-modules'
// import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showSign } from '../../actions/sign'
import { isSignin } from '../../reducers/sign'
import { like, unlike } from '../../actions/like'

class LikeButton extends Component {

  constructor(props) {
    super(props)

    let { likeCount, likeStatus, likeType, targetId } = this.props

    this.state = {
      count: likeCount || 0,
      status: likeStatus || false,
      type: likeType || '',
      targetId: targetId || ''
    }

    this.handleLike = this.handleLike.bind(this)
  }

  handleLike() {

    const self = this
    const { like, unlike } = this.props
    const { status, count, type, targetId } = this.state

    if (status) {

      unlike({
        type: type,
        target_id: targetId
      }, (err, result) => {

        if (err) {
          alert(result.error)
          return
        }

        self.setState({
          status: false,
          count: count - 1
        })

      })

    } else {

      like({
        type: type,
        target_id: targetId,
        mood: 1
      }, (err, result) => {

        if (err) {
          alert(result.error)
          return
        }

        self.setState({
          status: true,
          count: count + 1
        })

      })

    }

  }

  render () {

    const { isSignin, showSign } = this.props
    const { count, status } = this.state

    if (!isSignin) {
      return (<a href="javascript:void(0)" onClick={showSign}>赞 {count && count > 0 ? count : null}</a>)
    }

    return (
      <a href="javascript:void(0)" onClick={()=>{this.handleLike()}}>
        {status ? "取消赞" : '赞'}
        {count && count > 0 ? count : null}
      </a>
    )
  }
}

LikeButton.propTypes = {
  showSign: PropTypes.func.isRequired,
  isSignin: PropTypes.bool.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    isSignin: isSignin(state)
  }
}

function mapDispatchToProps(dispatch, props) {

  const name = props.name,
        filters = props.filters || {}

  return {
    showSign: bindActionCreators(showSign, dispatch),
    like: bindActionCreators(like, dispatch),
    unlike: bindActionCreators(unlike, dispatch)
  }

}

// LikeButton = CSSModules(LikeButton, styles)

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)
