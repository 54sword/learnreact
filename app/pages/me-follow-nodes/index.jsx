import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Subnav from '../../components/subnav'
import Questions from '../../components/questions'
import NodeList from '../../components/node-list'

import Shell from '../../shell'

class MeQuestions extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '我加入的社群'
    })
  }

  render() {

    const { me } = this.props

    if (!me) {
      return (<div>loading</div>)
    }

    return (
      <div>
        <Subnav left="返回" middle="我加入的社群" />
        <NodeList name={me._id} userId={me._id} />
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

MeQuestions = connect(mapStateToProps, mapDispatchToProps)(MeQuestions)

export default Shell(MeQuestions)
