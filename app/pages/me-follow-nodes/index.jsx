import React, { Component, PropTypes } from 'react'

// import CSSModules from 'react-css-modules'
// import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Subnav from '../../components/subnav'
import Questions from '../../components/questions'
import NodeList from '../../components/node-list'

class MeQuestions extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { me } = this.props

    if (!me) {
      return (<div>loading</div>)
    }

    return (
      <div>
        <Subnav
          left="返回"
          middle="我关注的话题"
        />
        <NodeList
          userId={me._id}
        />

      </div>
    )

  }

}

MeQuestions.propTypes = {
  me: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {
    me: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
  }
}

// MeQuestions = CSSModules(MeQuestions, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeQuestions)