import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadQuestionById } from '../../actions/questions'
import { getQuestionById } from '../../reducers/questions'
import { addAnswer, resetNewAnswersList } from '../../actions/answers'

import Shell from '../../shell'

import Subnav from '../../components/subnav'
import Editor from '../../components/editor'

class AddAnswer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      question: null,
      content: ''
    }
    this.submitQuestion = this.submitQuestion.bind(this)
    this.syncContent = this._syncContent.bind(this)
  }

  componentWillMount() {

    this.props.setMeta({
      title: '编写答案'
    })

    let { loadQuestionById } = this.props

    const [ question ] = this.props.question

    if (!question) {
      loadQuestionById()
    }

  }

  submitQuestion() {

    let { addAnswer, resetNewAnswersList } = this.props
    let questionId = this.props.params.questionId
    // let { answerDetail } = this.refs
    const { content } = this.state

    if (!content) {
      alert('不能提交空的答案')
      return
    }

    addAnswer({
      questionId: questionId,
      answerContent: content,
      // answerPrice: answerPrice.value,
      deviceId: 1,
      callback: function(err, result) {

        if (result && result.success) {
          resetNewAnswersList('/question/'+questionId, {
            question_id: questionId
          })
          browserHistory.push('/question/'+questionId+'?subnav_back=/')
          return
        }

        if (result && !result.success) {
          alert(result.error)
        } else {
          console.log(err, result)
        }

      }
    })

  }

  _syncContent(contentJson) {
    this.state.content = contentJson
  }

  render() {

    const [ question ] = this.props.question

    if (!question) {
      return (<div></div>)
    }

    return (<div>
      <Subnav
        left="取消"
        middle="编写答案"
      />
      <div className="container">
        <div>
          <Editor syncContent={this.syncContent} />
          {/*<textarea styleName="answerDetail" className="textarea" ref="answerDetail" placeholder="详情"></textarea>*/}
        </div>
        <div>
          <button className="button-full" onClick={this.submitQuestion}>提交</button>
        </div>
      </div>
    </div>)
  }

}

AddAnswer.propTypes = {
  question: PropTypes.array.isRequired,
  addAnswer: PropTypes.func.isRequired,
  resetNewAnswersList: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    question: getQuestionById(state, props.params.questionId)
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    resetNewAnswersList: bindActionCreators(resetNewAnswersList, dispatch),
    loadQuestionById: function(){
      bindActionCreators(loadQuestionById, dispatch)({
        questionId: props.params.questionId,
        callback: function(err){
          if (err) {
            props.displayNotFoundPage()
          }
        }
      })
    },
    addAnswer: bindActionCreators(addAnswer, dispatch)
  }
}

AddAnswer = CSSModules(AddAnswer, styles)

AddAnswer = connect(mapStateToProps, mapDispatchToProps)(AddAnswer)

export default Shell(AddAnswer)
