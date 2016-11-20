import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Subnav from '../../components/subnav'
import Questions from '../../components/questions'
import PeopleList from '../../components/people-list'

import Shell from '../../shell'

class MeFollowPeople extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '我关注的人'
    })
  }

  render() {

    const { me } = this.props

    if (!me) {
      return (<div>loading</div>)
    }

    return (
      <div>
        <Subnav left="返回" middle="我关注的人" />
        <PeopleList userId={me._id} />
      </div>
    )

  }

}

MeFollowPeople.propTypes = {
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

MeFollowPeople = connect(mapStateToProps, mapDispatchToProps)(MeFollowPeople)

export default Shell(MeFollowPeople)
