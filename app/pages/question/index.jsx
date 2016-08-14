import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../../actions'
var webapi = require('../../utils/api')

import Nav from '../../components/nav'

import styles from './index.scss'


class Question extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      question: null,
      answers: []
    }
    this.fetchAnswers = this.fetchAnswers.bind(this)
  }

  fetchAnswers(questionId) {

    var _self = this;

    webapi.fetchAnswers(questionId, function(err, result){
      if (err) {
        console.log(err)
        return;
      }
      if (result && result.success) {
        _self.setState({
          "answers": result.data
        });
      }

      // console.log(result)

    });

  }

  componentWillMount() {

    console.log('我进入问题页面了')

    let _self = this
    let questionId = _self.props.params.questionId

    const { question, actions } = this.props

    for (var i = 0, max = question.questions.length; i < max; i++) {
      if (question.questions[i]._id == questionId) {

        _self.setState({
          question: question.questions[i]
        });

        _self.fetchAnswers(questionId);

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
        _self.fetchAnswers(questionId);
      }
    });

  }

  render () {

    const { question, answers } = this.state

    if (!question) {
      return (<div>问题不存在</div>)
    }

    // <DocumentTitle title={question.title}>

    return (

      <div>
        <Nav />

        <div className="container">

          <div className={styles.question}>
            <div className={styles.questionHeader}>
              <Link to={`user/${question.user_id._id}`}>
                <img src={question.user_id.avatar_url} />
                {question.user_id.nickname}
              </Link>
            </div>
            <div className={styles.questionTitle}>
              <h1>{question.title}</h1>
            </div>
            <div className={styles.questionDetail}>{question.content}</div>
          </div>

          <div className={styles.other}>
            {question.answers_count} 个答案 <Link to={`/add-answer/${question._id}`}>写答案</Link>
          </div>

          <div>
            <div className={styles.answers}>
            {answers.map((answer)=>{
              return(
                <div className={styles.answerItem} key={answer._id}>
                  <div className={styles.answerHeader}>
                    <img className="user-avatar" src={answer.user_id.avatar_url} />
                    {answer.user_id.nickname} {answer.user_id.brief}
                  </div>
                  <div className={styles.answersDetail}>
                    <div>{answer.brief}</div>
                    <Link to={`/answer/${answer._id}`}>¥{answer.price} 查看答案</Link>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    question: state.question
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)

// export default Question
