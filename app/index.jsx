import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import cookie from 'react-cookie'

// ---

import configureStore from './store/configureStore'
let store = configureStore()

// ---

import styles from './pages/global.scss'

// ---

import Home from './pages/home'
import Topic from './pages/topic'
import Question from './pages/question'
import Me from './pages/me'
import NotFound from './pages/not-found'
import Answer from './pages/answer'
import AddAnswer from './pages/add-answer'
import Find from './pages/find'

import signupEmailVerify from './pages/signup-email-verify'
import AddQuestion from './pages/add-question'

// ----

let webapi = require('./utils/api')

let accessToken = cookie.load('accessToken')

if (!accessToken) {
  start(false);
} else {

  // 如果有登录状态，那么验证登录
  webapi.fetchUserinfo(accessToken, function(err, data){

    if (err) {
      store.dispatch({ type: 'REMOVE_COOKIE' })
      location.reload()
      return;
    }

    store.dispatch({ type: 'SET_TOKEN', token: accessToken })
    store.dispatch({ type: 'SET_USER', userinfo: data.data.user})

    start(true);
  });
}

// 开始
function start(isSignin){

  // 验证是否登录
  function requireAuth(nextState, replaceState) {
    if (!isSignin) {
      replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
  }

  class APP extends React.Component {
    render() { return this.props.children }
  }

  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={APP}>
          <IndexRoute component={Home} />
          <Route path="topic" component={Topic} />
          <Route path="question/:questionId" component={Question} />
          <Route path="answer/:answerId" component={Answer} />
          <Route path="signup-email-verify/:code" component={signupEmailVerify} />
          <Route path="me" component={Me} onEnter={requireAuth} />
          <Route path="add-question" component={AddQuestion} onEnter={requireAuth} />
          <Route path="add-answer/:questionId" component={AddAnswer} onEnter={requireAuth} />
          <Route path="find" component={Find} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  ), document.body);

}
