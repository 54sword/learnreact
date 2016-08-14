import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import Nav from '../../components/nav'

class SignupEmailVerify extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: '正在邮箱验证中...'
    }
  }
  
  componentWillMount() {
    let self = this
    let code = this.props.params.code

    const { signupEmailVerify } = this.props.actions

    signupEmailVerify(code, function(err, result){
      if (err) console.log(err)
      if (result.success == true) {
        self.setState({
          status: '邮箱验证成功！'
        })
        // browserHistory.push('/search?id=1');
      } else {
        self.setState({
          status: '邮箱验证失败'
        })
      }
    })
  }

  render () {
    return (
      <div><Nav />{this.state.status}</div>
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
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupEmailVerify)

// export default Question
