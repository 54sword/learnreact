import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addAccessToken } from '../../actions/sign'

class Oauth extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { access_token } = this.props.location.query
    const { addAccessToken } = this.props
    if (access_token) {
      addAccessToken(access_token)
      window.location.href = '/'
    }
  }

  render() {

    return (
      <div>
      </div>
    )

  }

}

Oauth.propTypes = {
  addAccessToken: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccessToken: bindActionCreators(addAccessToken, dispatch)
  }
}

Oauth = connect(mapStateToProps, mapDispatchToProps)(Oauth)

export default Oauth
