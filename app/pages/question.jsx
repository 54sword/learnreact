import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import * as TodoActions from '../actions'
var webapi = require('../utils/api')

import Nav from '../components/nav'

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

      console.log(result)

    });

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
      return (<div></div>)
    }

    // console.log(question)

    return (
      <DocumentTitle title={question.title}>
      <div className="container">
        <Nav />

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="exampleModalLabel">编写答案</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="recipient-name" className="control-label">概述</label>
                    <input type="text" className="form-control" id="recipient-name" />
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="control-label">编写答案</label>
                    <textarea className="form-control" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" className="btn btn-primary">提交</button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-default">

          <div id="question" className="panel-heading">
            {/*<a href="#">首页</a> > <a href="#">{question.node_id.name}</a>*/}
            <img src={question.user_id.avatar_url} />
            <div id="question-title">
              <h1>{question.title}</h1>
            </div>
            <div>
              <a href="#">{question.node_id.name}</a> {question.user_id.nickname}
            </div>
            <div id="question-detail">
              <h4>{question.content}</h4>
            </div>

          </div>


          <div>
            <div className="row">
              <div className="col-xs-6">
                {question.answers_count} 个答案
              </div>
              <div className="col-xs-6 text-right">
                <a href="#" data-toggle="modal" data-target="#exampleModal">写答案</a>
              </div>
            </div>
            <div id="answers">
            {answers.map((answer)=>{
              return(
                <li className="answer-item" key={answer._id}>
                  <div className="answer-header">
                    <img className="user-avatar" src={answer.user_id.avatar_url} />
                    <p>{answer.user_id.nickname} {answer.user_id.brief}</p>
                  </div>
                  <div className="answer-brief">{answer.brief}</div>
                  <Link to={`/answer/${answer._id}`}>¥{answer.price} 查看答案</Link>
                </li>
              )
            })}
            </div>
          </div>
        </div>

      </div>
      </DocumentTitle>
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
