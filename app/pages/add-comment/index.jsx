import React, { Component, PropTypes } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addComment } from '../../actions/comment'

import Shell from '../../shell'
import Subnav from '../../components/subnav'

class CommentsList extends Component {

  constructor(props) {
    super(props)
    this.submitComment = this.submitComment.bind(this)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '写评论'
    })
  }

  submitComment() {

    const self = this
    const { comment } = this.refs
    const { answerId } = this.props.params
    const { addComment } = this.props
    const { reply_id } = this.props.location.query

    addComment({
      content: comment.value,
      answerId,
      replyId: reply_id,
      deviceId: 1,
      callback: function(err, result) {
        if (!err) {
          alert('评论提交成功')
          self.context.router.goBack()
        }
      }
    })

  }

  render() {

    return (<div>
      <Subnav
        left="取消"
        middle="写评论"
        right={(<a href="javascript:void(0);" onClick={this.submitComment}>提交</a>)}
      />
      <div className="container">

        <div styleName="write-reply">
          <textarea ref="comment"></textarea>
        </div>

      </div>

    </div>)
  }

}

CommentsList.contextTypes = {
  router: PropTypes.object.isRequired
}

CommentsList.propTypes = {
  addComment: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    addComment: bindActionCreators(addComment, dispatch)
  }
}

CommentsList = CSSModules(CommentsList, styles)
CommentsList = connect(mapStateToProps, mapDispatchToProps)(CommentsList)

export default Shell(CommentsList)
