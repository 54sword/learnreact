import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import Device from '../../common/device'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showSign } from '../../actions/sign'
import { isSignin } from '../../reducers/sign'
import { loadQuestionById } from '../../actions/questions'
import { getQuestionById } from '../../reducers/questions'

import Shell from '../../shell'
import Subnav from '../../components/subnav'
import Answers from '../../components/answers'
import FollowQuestion from '../../components/follow-question'

import Editor from '../../components/editor'

class Question extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {

    const { loadQuestionById } = this.props
    let [ question ] = this.props.question

    if (!question) {
      loadQuestionById((err, result)=>{
        this.props.setMeta({
          title: result.title
        })
      })
    } else {
      this.props.setMeta({
        title: question.title
      })
    }
  }

  render () {

    let { isSignin, showSign } = this.props
    let [ question ] = this.props.question

    if (!question) {
      return (<div>loading...</div>)
    }

    return (

      <div>
        <Subnav
          left="返回"
          middle="内容正文"
          right={isSignin ?
            <Link to={`/add-answer/${question._id}`}>写答案</Link> :
            <a href="javascript:;" onClick={showSign}>写答案</a>
          }
        />

        <div className="container">

          <div styleName="question">
            <div styleName="questionHeader">
              <Link to={`/people/${question.user_id._id}`}>
                <img src={question.user_id.avatar_url} />
                {question.user_id.nickname}
              </Link>
            </div>
            <div styleName="questionTitle">
              <h1>{question.title}</h1>
            </div>
            <div styleName="questionDetail">
              <Editor readOnly={true} content={question.content} />
            </div>
          </div>

          <div styleName="other">
            {question.answers_count ? <span>{question.answers_count} 个答案</span> : null}
            {question.view_count ? <span>{question.view_count} 浏览</span> : null}

            <FollowQuestion question={question} />

            {isSignin ?
              <Link to={`/add-answer/${question._id}`}>写答案</Link> :
              <a href="javascript:;" onClick={showSign}>写答案</a>
            }
          </div>

          <Answers
            name={this.props.location.pathname}
            filters={{ question_id: this.props.params.questionId }}
          />

        </div>

      </div>
    )
  }
}

Question.propTypes = {
  showSign: PropTypes.func.isRequired,
  isSignin: PropTypes.bool.isRequired,
  loadQuestionById: PropTypes.func.isRequired,
  question: PropTypes.array.isRequired,
}

function mapStateToProps(state, props) {
  return {
    isSignin: isSignin(state),
    question: getQuestionById(state, props.params.questionId)
  }
}

function mapDispatchToProps(dispatch, props) {

  return {
    showSign: bindActionCreators(showSign, dispatch),
    loadQuestionById: function(callback){
      bindActionCreators(loadQuestionById, dispatch)({
        questionId: props.params.questionId,
        callback: function(err, question){
          if (err) {
            props.displayNotFoundPage()
          } else {
            callback(err, question)
          }
        }
      })
    }
  }

}

Question = CSSModules(Question, styles)

let QuestionComponent = connect(mapStateToProps, mapDispatchToProps)(Question)

export default Shell(QuestionComponent)
