
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../../actions'

import styles from './index.scss'

var webapi = require('../../utils/api')

class Questions extends React.Component {

  constructor(props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.loadQuestions = this.loadQuestions.bind(this)
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
        <div className={styles.questionItem} key={question._id}>
          <div>
            <div className={styles.questionHeader}>
              <Link to={`/user/${question.user_id._id}`}>
                <img className={styles.avatar} src={question.user_id.avatar_url} />
                <span>{question.user_id.nickname}</span>
              </Link>
            </div>
            <div className={styles.questionTitle}>
              <Link to={`/question/${question._id}`}>{question.title}</Link>
            </div>
          </div>
          <div className={styles.answers}>
            {question.answers.map(answer=>{
              return (
                <div className={styles.answerItem} key={answer._id}>
                  <div className={styles.answerHeader}>
                    <img src={answer.user_id.avatar_url} />
                    {answer.user_id.nickname} {answer.user_id.brief}
                  </div>
                  <div>
                    <div>{answer.brief}</div>
                    <Link to={`/answer/${answer._id}`}>¥{answer.price} 查看答案</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    })

    var loading = question.loading && question.nomore == false ? <div className="list-group-item">正在加载中...</div> : ''

    var loadMore = question.nomore == false ? <div className="list-group-item" onClick={this.loadMore}><a href="javascript:;">加载更多</a></div> : <div className="list-group-item">没有更多</div>

    return (
      <div className={styles.questions}>
        {questionHTML}
        {loading}
        {loadMore}
      </div>
    )
  }

}

Questions.propTypes = {
  user: PropTypes.array.isRequired,
  question: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    question: state.question,
    user: state.user
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
