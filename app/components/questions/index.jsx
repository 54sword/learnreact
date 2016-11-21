import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import arriveFooter from '../../common/arrive-footer'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadQuestionsByName, addNewQuestionsList, resetNewQuestionList } from '../../actions/questions'
import { getQuestionsByName, getQuestionsLoadingStatus, getQuestionsNomoreStatus } from '../../reducers/questions'

import LikeButton from '../../components/like'
import FollowQuestion from '../../components/follow-question'

function Answers(answers) {
  return (
    <div styleName="answers">
      {answers.map(answer=>{
        return (
          <div styleName="answerItem" key={answer._id}>
            <div styleName="answerHeader">
              <Link to={`/people/${answer.user_id._id}`}>
                <img src={answer.user_id.avatar_url} />
                {answer.user_id.nickname} {answer.user_id.brief}
              </Link>
            </div>
            <Link to={`/answer/${answer._id}`}>
              <div styleName="answerBody">
                <div styleName="answerContent">{answer.content}</div>
              </div>
            </Link>
            <LikeButton
              likeCount={answer.like_count}
              likeStatus={answer.like}
              likeType={'answer'}
              targetId={answer._id}
            />
            回复 {answer.comment_count > 0 ? answer.comment_count : null}
          </div>
        )
      })}
    </div>
  )
}

function Questions(questions) {
  return (
    <div styleName="questions">

      {questions.map(question=>{
        return (
          <div styleName="questionItem" key={question._id}>
            <div>
              <Link to={`/people/${question.user_id._id}`}>
                <div styleName="questionHeader">
                  <img src={question.user_id.avatar_url} />
                  <span>{question.user_id.nickname}</span>
                </div>
              </Link>
              <Link to={`/question/${question._id}`}>
                <div styleName="questionTitle">
                  {question.title}
                </div>
              </Link>
              {question.answers_count || question.follow_count ?
                <div styleName="other">
                  {question.answers_count > 0 ? <span>{question.answers_count} 个回答</span> : null}
                  {question.follow_count > 0 ? <span>{question.follow_count} 人关注 </span> : null}
                  <FollowQuestion question={question} />
                </div>
              : null}
            </div>
            {Answers(question.answers)}
          </div>
        )
      })}

    </div>
  )
}

function StatusBar(loading, nomore, handleLoad) {

  let dom

  if (loading && !nomore) {
    dom = <div>正在加载中...</div>
  } else if (!loading && !nomore) {
    dom = <div onClick={handleLoad}>加载更多</div>
  } else if (nomore) {
    dom = <div>没有更多</div>
  }

  return dom
}

class QuestionsList extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    var self = this;

    const { questions, loadQuestions, addNewQuestionsList } = self.props

    // 添加一个新的 list
    addNewQuestionsList()

    if (questions.length === 0) {
      loadQuestions()
    }

    arriveFooter.add('home', ()=>{
      loadQuestions()
    })
  }

  componentWillUnmount() {
    arriveFooter.remove('home')
  }

  componentWillReceiveProps(props) {

    if (props.update != this.props.update) {

      const { resetNewQuestionList, loadQuestions } = this.props

      // console.log(props.update + '|' + this.props.update)

      resetNewQuestionList({ name: props.name, filters: props.filters })
      loadQuestions()
    }

    // console.log(props)
    // console.log(this.props)
  }

  render () {
    const { questions, loading, nomore, loadQuestions } = this.props
    return (
      <div className="container">
        {Questions(questions)}
        {StatusBar(loading, nomore, loadQuestions)}
      </div>
    )
  }

}

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // brief: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      // content_html: PropTypes.string.isRequired,
      // device: PropTypes.number.isRequired,
      // price: PropTypes.number.isRequired,
      user_id: PropTypes.object.isRequired
    })).isRequired,
    answers_count: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    create_at: PropTypes.string.isRequired,
    // device: PropTypes.number.isRequired,
    node_id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    user_id: PropTypes.object.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  nomore: PropTypes.bool.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  resetNewQuestionList: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    loading: getQuestionsLoadingStatus(state, props.name),
    nomore: getQuestionsNomoreStatus(state, props.name),
    questions: getQuestionsByName(state, props.name)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadQuestions: function(){
      bindActionCreators(loadQuestionsByName, dispatch)(props.name)
    },
    addNewQuestionsList: function(){
      bindActionCreators(addNewQuestionsList, dispatch)({
        name: props.name,
        filters: props.filters
      })
    },
    resetNewQuestionList: bindActionCreators(resetNewQuestionList, dispatch)
  }
}

QuestionsList = CSSModules(QuestionsList, styles);

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList)
