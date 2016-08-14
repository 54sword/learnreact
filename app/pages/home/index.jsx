import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

/// ---

import Nav from '../../components/nav'
import Questions from '../../components/questions'

import styles from './index.scss'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user, question, actions } = this.props



    return (
      <div>
        <Nav />
        <div className="container">
          {user.userinfo ? <div><Link to="/add-question" className={styles.addQuestion}>提问</Link></div> : ''}
          <Questions
            questions={question}
            actions={actions}
          />
        </div>
      </div>
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
  question: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    scroll: state.scroll,
    user: state.user,
    question: state.question
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
