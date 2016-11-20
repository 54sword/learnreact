import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signupEmailVerify } from '../../actions/sign'

import Nav from '../../components/nav'

import Shell from '../../shell'

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

    this.props.setMeta({
      title: '验证邮箱'
    })

    const { signupEmailVerify } = this.props

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
  signupEmailVerify: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signupEmailVerify: bindActionCreators(signupEmailVerify, dispatch)
  }
}

SignupEmailVerify = connect(mapStateToProps, mapDispatchToProps)(SignupEmailVerify)

export default Shell(SignupEmailVerify)
