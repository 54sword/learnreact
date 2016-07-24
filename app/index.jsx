import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActions from './actions'

var webapi = require('./utils/api')

/// ---

import configureStore from './store/configureStore'

/// ---

// import './static/sass/app.scss'
import styles from './static/css/global.scss'
/// ---

// import Welcome from './pages/welcome'
import Home from './pages/home'
import Topic from './pages/topic'
import Question from './pages/question'
import Me from './pages/me'
import NotFound from './pages/not-found'
import Signin from './components/signin'
import Signup from './components/signup'
import Answer from './pages/answer'
import signupEmailVerify from './pages/signup-email-verify'

// import config from './config/config'

/// ---

var webapi = require('./utils/api')

const store = configureStore()

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataInit: false
    }
  }

  componentWillMount() {

    let _self = this

    const { user, actions } = this.props

    let accessToken = $.cookie('accessToken') || null;

    if (accessToken) {
      webapi.fetchUserinfo(accessToken, function(err, data){

        if (err) {
          actions.removeToken()
          location.reload()
          return;
        }

        actions.setUser(accessToken)
        actions.setUser(data.data.user)
        _self.setState({ dataInit: true })
      });
    } else {
      _self.setState({ dataInit: true })
    }

  }

  render() {
    if (this.state.dataInit) {
      return this.props.children
    } else {
      return (<div></div>)
    }
  }
}

App.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

let _APP = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

const app = document.createElement('div');
document.body.appendChild(app);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={_APP}>
        <IndexRoute component={Home}/>
        <Route path="topic" component={Topic}/>
        <Route path="question/:questionId" component={Question}/>
        <Route path="answer/:answerId" component={Answer} />
        <Route path="signup-email-verify/:code" component={signupEmailVerify} />
        <Route path="me" component={Me}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), app);
