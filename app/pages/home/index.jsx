import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../../actions'

/// ---

import Nav from '../../components/nav'
import Questions from '../../components/questions'

import styles from './index.scss'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user, scroll, actions } = this.props

    return (
      <DocumentTitle title="问答社区">
      <div>
        <Nav />
        <div className="container">
          {user.userinfo ? <div><Link to="/add-question" className={styles.addQuestion}>提问</Link></div> : ''}
          <Questions />
        </div>
      </div>
      </DocumentTitle>
    );
  }

  componentDidMount() {
    this.props.actions.setScrollPosition('home')
  }

  componentWillUnmount() {
    this.props.actions.setScroll('home')
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  scroll: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    scroll: state.scroll,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
