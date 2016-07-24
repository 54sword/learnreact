import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import * as TodoActions from '../actions'
var webapi = require('../utils/api')

import Nav from '../components/nav'

class SignupEmailVerify extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let code = this.props.params.code
    webapi.signupEmailVerify(code, function(err, result){
      if (err) console.log(err)
      console.log(result)
    })
  }

  render () {



    return (
      <div>
        密码验证
      </div>
    );
  }
}

SignupEmailVerify.propTypes = {
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
)(SignupEmailVerify)

// export default Question
