import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from '../../components/nav'
import Shell from '../../shell'
// import FollowNodesList from '../../components/follow-nodes-list'
import NodeList from '../../components/node-list'

class Topics extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '社群'
    })
  }

  render() {

    return (
      <div>
        <Nav />

        <div className="container">

          <NodeList name="topics" />

        </div>

      </div>
    )
  }

}


Topics.propTypes = {
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

Topics = CSSModules(Topics, styles)

let _Topics = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics)

export default Shell(_Topics)
