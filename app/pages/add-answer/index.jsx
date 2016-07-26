import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, Link, IndexLink, IndexRoute, browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../../actions'

import Nav from '../../components/nav'

import styles from './index.scss'

var webapi = require('../../utils/api')

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

    const { question, actions } = this.props

    for (var i = 0, max = question.questions.length; i < max; i++) {
      if (question.questions[i]._id == questionId) {

        _self.setState({
          question: question.questions[i]
        });

        return;
      }
    }

    // 如果数据流中没有对应的问题，那么从服务器上获取
    webapi.fetchQuestionById(questionId, function(err, result){
      if (err) {
        console.log(err);
        return;
      }
      if (result && result.success) {
        _self.setState({
          "question": result.data.question
        });
      }
    });

  }

  submitQuestion() {
    let questionId = this.props.params.questionId
    let { answerBrief, answerDetail, answerPrice } = this.refs
    let { user } = this.props

    webapi.addAnswer({
      question_id: questionId,
      answer_brief: answerBrief.value,
      answer_content: answerDetail.value,
      price: answerPrice.value,
      device_id: 1
    }, user.token, function(err, result){
      console.log(err)
      console.log(result)
    });

  }

  render() {

    const { question } = this.state

    if (!question) {
      return (<div></div>)
    }

    return (<div>
      <Nav />
      <div className="container">
        <div>{question.title}</div>
        <div>编写答案</div>
        <div>公开</div>
        <div>
          <input className={styles.answerBrief} type="text" ref="answerBrief"></input>
        </div>
        <div>详情</div>
        <div>
          <textarea className={styles.answerDetail} ref="answerDetail"></textarea>
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
        </div>
        <div>
          <button className={styles.submit} onClick={this.submitQuestion}>提交</button>
        </div>
      </div>
    </div>)
  }

}

AddAnswer.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user,
    question: state.question
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}


// export default AddAnswer;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAnswer)
