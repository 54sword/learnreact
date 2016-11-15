import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadComments } from '../../actions/comment'

import LikeButton from '../../components/like'

class CommentsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      more: true,
      filters: this.props.filters
    }
    this.handleLoadComments = this.handleLoadComments.bind(this)
  }

  componentWillMount() {

    const self = this

    self.handleLoadComments()

    // 监听滚动条是否
    var $window = $(window)
    var $document = $(document)
    $window.scroll(function(){
      if ($document.scrollTop() + $window.height() >= $document.height() - 150) {
        self.handleLoadComments()
      }
    })

  }

  componentWillUnmount() {
    // 离开页面的时候，注意接触绑定的事件
    $(window).unbind('scroll')
  }

  handleLoadComments() {

    const self = this
    const { loadComments } = this.props
    const { loading, more, filters, list } = this.state
    // const { answerId } = this.props.answerId

    if (loading || !more) {
      return
    }

    this.setState({
      loading: true
    })

    loadComments(filters, function(err, result) {

      if (filters.gt_create_at && result[result.length - 1]) {
        filters.gt_create_at = new Date(result[result.length - 1].create_at).getTime()
      }

      if (filters.page) {
        filters.page = filters.page + 1
      }

      self.setState({
        list: list.concat(result),
        filters: filters,
        loading: false,
        more: result.length < filters.per_page ? false : true
      })

    })
  }

  render() {

    const { list } = this.state

    return (<div>
      <div className="container">

        {list.map(comment => {
          return (
            <div styleName="comment-item" key={comment._id}>
              <div>
                <img styleName="avatar" src={comment.user_id.avatar_url} />
                <Link to={`/people/${comment.user_id._id}`}>{comment.user_id.nickname}</Link>
                {comment.reply_id ?
                  <span> 回复了 <Link to={`/people/${comment.reply_id.user_id._id}`}>{comment.reply_id.user_id.nickname}</Link></span>
                  : null
                }
              </div>
              <div>{comment.content}</div>
              <div styleName="comment-item-footer">
                <span>
                  <LikeButton
                    likeCount={comment.like_count}
                    likeStatus={comment.like}
                    likeType={'comment'}
                    targetId={comment._id}
                  />
                </span>
                <span><Link to={`/add-comment/${comment.answer_id}?reply_id=${comment._id}`}>回复</Link></span>
                <span>{comment.create_at}</span>
              </div>
            </div>
          )
        })}

      </div>

    </div>)
  }

}


CommentsList.propTypes = {
  loadComments: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadComments: bindActionCreators(loadComments, dispatch)
  }
}

CommentsList = CSSModules(CommentsList, styles)
CommentsList = connect(mapStateToProps, mapDispatchToProps)(CommentsList)


export default CommentsList
