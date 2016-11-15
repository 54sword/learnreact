import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showSign } from '../../actions/sign'
import { isSignin } from '../../reducers/sign'
import { addNewAnswersList, loadAnswersByName } from '../../actions/answers'
import { getAnswersByName } from '../../reducers/answers'

import LikeButton from '../../components/like'

class Answers extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {

    const { addNewAnswersList, loadAnswers, answers  } = this.props

    if (answers.length == 0) {
      addNewAnswersList()
      loadAnswers()
    }

  }

  render () {

    let { isSignin, showSign, answers } = this.props

    return (
      <div className="container">
        <div>
          <div styleName="answers">
          {answers.map((answer)=>{
            return(
              <div styleName="answerItem" key={answer._id}>
                <div styleName="answerHeader">
                  <img className="user-avatar" src={answer.user_id.avatar_url} />
                  {answer.user_id.nickname} {answer.user_id.brief}
                </div>
                <div styleName="answersDetail">
                  <div dangerouslySetInnerHTML={{__html:answer.content.replace(/\n/g,"<br />")}} />
                </div>
                <div styleName="answer-footer">

                  <LikeButton
                    likeCount={answer.like_count}
                    likeStatus={answer.like}
                    likeType={'answer'}
                    targetId={answer._id}
                  />

                  <div styleName="reply">
                    <Link to={`/comment/${answer._id}`} className="button－white">回复{answer.comment_count > 0 ? ' '+answer.comment_count : null}</Link>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    )
  }
}

Answers.propTypes = {
  showSign: PropTypes.func.isRequired,
  isSignin: PropTypes.bool.isRequired,
  answers: PropTypes.array.isRequired,
  addNewAnswersList: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {

  const name = props.name

  return {
    isSignin: isSignin(state),
    answers: getAnswersByName(state, name)
  }
}

function mapDispatchToProps(dispatch, props) {

  const name = props.name,
        filters = props.filters || {}

  return {
    showSign: bindActionCreators(showSign, dispatch),
    addNewAnswersList: () => {
      bindActionCreators(addNewAnswersList, dispatch)({
        name: name,
        filters: filters
      })
    },
    loadAnswers: () => {
      bindActionCreators(loadAnswersByName, dispatch)({
        name: name
      })
    }
  }

}

Answers = CSSModules(Answers, styles)

export default connect(mapStateToProps, mapDispatchToProps)(Answers)
