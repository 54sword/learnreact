import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import Subnav from '../../components/subnav'
import CommentList from '../../components/comment-list'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showSign } from '../../actions/sign'
import { isSignin } from '../../reducers/sign'

import Shell from '../../shell'

class Comments extends Component {

  constructor(props) {
    super(props)
    this.addComment = this._addComment.bind(this)
  }

  componentWillMount() {

    this.props.setMeta({
      title: '评论'
    })

  }

  _addComment() {
    const { isSignin, showSign } = this.props
    const { answerId } = this.props.params

    if (isSignin) {
      browserHistory.push('/add-comment/'+answerId)
    } else {
      showSign()
    }

  }

  render() {

    const { answerId } = this.props.params

    return (<div>
      <Subnav
        middle="全部评论"
        right={(<a href="javascript:void(0);" onClick={this.addComment}>添加评论</a>)}
      />

      <CommentList
        filters={{
          answer_id: answerId,
          gt_create_at: 1,
          per_page: 20
        }}
      />

    </div>)
  }

}


Comments.propTypes = {
  isSignin: PropTypes.bool.isRequired,
  showSign: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    isSignin: isSignin(state)
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    showSign: bindActionCreators(showSign, dispatch)
  }
}

Comments = CSSModules(Comments, styles)
Comments = connect(mapStateToProps, mapDispatchToProps)(Comments)

export default Shell(Comments)
