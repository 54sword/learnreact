import React, { Component, PropTypes } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Subnav from '../../components/subnav'
import Answers from '../../components/answers'

class MeAnswers extends Component {

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
          middle="我编写的答案"
        />
        
        <Answers
          name={me._id}
          filters={{
            user_id: me._id,
            date: new Date().getTime()
          }}
        />

      </div>
    )

  }

}

MeAnswers.propTypes = {
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

MeAnswers = CSSModules(MeAnswers, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeAnswers)
