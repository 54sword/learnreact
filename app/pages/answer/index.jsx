import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAnswerById } from '../../actions/answers'
import { getAnswerById } from '../../reducers/answers'
import { showSign } from '../../actions/sign'
import { isSignin } from '../../reducers/sign'

import Subnav from '../../components/subnav'
import CommentList from '../../components/comment-list'
import Editor from '../../components/editor'

import Shell from '../../shell'

class Answer extends React.Component {

  constructor(props) {
    super(props)
    this.addComment = this._addComment.bind(this)
  }

  _addComment() {
    const { isSignin, showSign } = this.props
    const [ answer ] = this.props.answer

    if (isSignin) {
      browserHistory.push('/add-comment/'+answer._id)
    } else {
      showSign()
    }
  }

  componentWillMount() {

    const self = this
    const [ answer ] = this.props.answer

    if (answer) {
      this.props.setMeta({
        title: answer.question_id.title + ' - ' + answer.user_id.nickname + '的答案'
      })
      return
    }

    let answerId = this.props.params.answerId

    const { fetchAnswerById, displayNotFoundPage } = this.props

    fetchAnswerById(answerId, (err, result) => {

      if (err) {
        displayNotFoundPage()
      } else {
        let answer = result.data[0]
        self.props.setMeta({
          title: answer.question_id.title + ' - ' + answer.user_id.nickname + '的答案'
        })
      }

    })

  }

  render () {

    const [ answer ] = this.props.answer

    if (!answer) {
      return(<div></div>)
    }

    let question = answer ? answer.question_id : null

    // right={<Link to={`/add-comment/${answer._id}`}>添加评论</Link>}
    return (
      <div>
        <Subnav
          middle="回答"
          right={<a href='javascript:void(0);' onClick={this.addComment}>添加评论</a>}
        />

        <div className="container" styleName="question">
          <Link to={`/question/${question._id}`}>{question.title}</Link>
        </div>

        <div className="container" styleName="answer">
          <div>
            <img src={answer.user_id.avatar_url} />
            <span>{answer.user_id.nickname} {answer.user_id.brief}</span>
          </div>
          <Editor content={answer.content} readOnly={true} />
          {/*<div dangerouslySetInnerHTML={{__html:answer.content.replace(/\n/g,"<br />")}}></div>*/}
        </div>

        <CommentList
          filters={{
            answer_id: answer._id,
            gt_create_at: 1,
            per_page: 20
          }}
        />

      </div>
    )

  }
}

Answer.propTypes = {
  answer: PropTypes.array.isRequired,
  fetchAnswerById: PropTypes.func.isRequired,
  isSignin: PropTypes.bool.isRequired,
  showSign: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {

  const answerId = props.params.answerId

  return {
    answer: getAnswerById(state, answerId),
    isSignin: isSignin(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnswerById: bindActionCreators(fetchAnswerById, dispatch),
    showSign: bindActionCreators(showSign, dispatch)
  }
}

Answer = CSSModules(Answer, styles)

Answer = connect(mapStateToProps, mapDispatchToProps)(Answer)

export default Shell(Answer)
