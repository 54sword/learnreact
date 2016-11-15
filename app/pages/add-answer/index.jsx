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

import Subnav from '../../components/subnav'

class AddAnswer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      question: null
    }
    this.submitQuestion = this.submitQuestion.bind(this)
  }

  componentWillMount() {

    let _self = this
    let questionId = _self.props.params.questionId
    let { loadQuestionById } = this.props

    const [ question ] = this.props.question

    if (!question) {
      loadQuestionById()
    }

  }

  submitQuestion() {

    let { addAnswer, resetNewAnswersList } = this.props
    let questionId = this.props.params.questionId
    let { answerBrief, answerDetail, answerPrice } = this.refs

    addAnswer({
      questionId: questionId,
      answerContent: answerDetail.value,
      answerPrice: answerPrice.value,
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
          <textarea styleName="answerDetail" className="textarea" ref="answerDetail" placeholder="详情"></textarea>
        </div>
        <div>
          价格 <select ref="answerPrice">
            <option value="1">1 ¥</option>
            <option value="2">2 ¥</option>
            <option value="3">3 ¥</option>
            <option value="4">4 ¥</option>
            <option value="5">5 ¥</option>
            <option value="6">6 ¥</option>
            <option value="7">7 ¥</option>
            <option value="8">8 ¥</option>
            <option value="9">9 ¥</option>
            <option value="10">10 ¥</option>
          </select>
          <button className="button" onClick={this.submitQuestion}>提交</button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAnswer)
