import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import * as TodoActions from '../../actions'
var webapi = require('../../utils/api')

import Nav from '../../components/nav'

class Question extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      answer: null
    }
  }

  componentWillMount() {

    let _self = this

    let answerId = _self.props.params.answerId

    const { question, actions } = this.props

    webapi.fetchAnswer(answerId, function(err, result){
      if (err) {
        console.log(err)
      }

      if (result.success) {
        _self.setState({
          answer: result.data
        })
      }

    });

  }

  render () {

    let answer = this.state.answer
    let question = answer ? answer.question_id : null

    if (!answer) {
      return(<div></div>)
    } else {

      return (
        <DocumentTitle title={answer.brief}>
        <div>
          <Nav />
          <div>
            <p>{question.title}</p>
            <p>{question.content}</p>
          </div>
          <div>
            <div>
              <img src={answer.user_id.avatar_url} />
              <span>{answer.user_id.nickname} {answer.user_id.brief}</span>
            </div>
            {answer.brief}
            <div>
              <button>¥1 查看答案</button>
            </div>
          </div>
        </div>
        </DocumentTitle>
      )

    }

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
