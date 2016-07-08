
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../actions'

var webapi = require('../utils/api')

class Questions extends React.Component {

  constructor(props) {
    super(props)
    this.loadMore = this.loadMore.bind(this);
    this.loadQuestions = this.loadQuestions.bind(this);
  }

  componentWillMount() {

    var _self = this;

    this.loadQuestions();

    var $window = $(window);
    var $document = $(document);
    $window.scroll(function(){
      if ($document.scrollTop() + $window.height() >= $document.height()) {
        _self.loadQuestions();
      }
    });
  }

  loadQuestions () {

    const { question, actions } = this.props

    let _self = this;

    if (question.nomore || question.loading) {
      return;
    }

    actions.loadingQuestions(true)

    webapi.fetchQuestions(question.perPage, question.date, function(err, result){

      actions.loadingQuestions(false)

      if (result.length == 0) {
        actions.nomoreQuestion(true)
      } else {
        actions.addQuestions(result)
      }

      _self.setState();
    })
  }

  loadMore () {
    this.loadQuestions();
  }

  render () {

    const { question, actions } = this.props

    var questionHTML = question.questions.map(question=>{
      return (
        <li key={question._id}>
          <img src={question.user_id.avatar_url} />
          <p><Link to={`/question/${question._id}`}>{question.title}</Link></p>
          <p>{question.content}</p>
          <div>
            {question.answers.map(answer=>{
              return (
                <div key={answer._id}>
                  <img src={answer.user_id.avatar_url} width="30" />
                  <p>{answer.user_id.nickname}</p>
                  <p>{answer.brief}</p>
                  <p>¥{answer.price} 查看答案</p>
                </div>
              )
            })}
          </div>
        </li>
      )
    })

    var loading = question.loading && question.nomore == false ? <li>正在加载中...</li> : ''

    var loadMore = question.nomore == false ? <li onClick={this.loadMore}><a href="javascript:;">加载更多</a></li> : <li>没有更多</li>

    return (
      <ul>
        {questionHTML}
        {loading}
        {loadMore}
      </ul>
    )
  }

}

Questions.propTypes = {
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
)(Questions)
