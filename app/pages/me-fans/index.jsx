import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import Subnav from '../../components/subnav'
// import FansList from '../../components/fans-list'
import PeopleList from '../../components/people-list'

import Shell from '../../shell'

class MeFollowPeople extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '我的粉丝'
    })
  }

  render() {

    const { me } = this.props

    return (
      <div>
        <Subnav left="返回" middle="我的粉丝" />
        <PeopleList type={"fans"} peopleId={me._id} />
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

// MeFollowPeople = CSSModules(MeFollowPeople, styles)

MeFollowPeople = connect(mapStateToProps, mapDispatchToProps)(MeFollowPeople)

export default Shell(MeFollowPeople)
