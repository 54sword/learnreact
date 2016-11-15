import React, { Component, PropTypes } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Subnav from '../../components/subnav'
import Questions from '../../components/questions'

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
          middle="我的主题"
        />
        <Questions
          name={me._id}
          filters={{
            per_page: 20,
            type: 'user',
            user_id: me._id,
            gt_create_at: new Date().getTime()
          }}
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

MeQuestions = CSSModules(MeQuestions, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeQuestions)
