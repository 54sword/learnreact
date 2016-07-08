import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from '../actions'
var webapi = require('../utils/api')

import Nav from '../components/nav'

class Question extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      question: null
    }
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

  render () {

    return (
      <div>
        <Nav />
        {this.state.question ?
          <div>
            <p>{this.state.question.title}</p>
            <p>{this.state.question.content}</p>
          </div>
        : '' }
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
