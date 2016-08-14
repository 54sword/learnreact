import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import cookie from 'react-cookie'

// -----
// 页面
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

// -----
// css 样式
import styles from './pages/global.scss'

// ----

import { bindActionCreators } from 'redux'
import * as actions from './actions'
import configureStore from './store/configure-store'
let store = configureStore()

// ---
// 如果包含accessToken 那么验证是否有效
let accessToken = cookie.load('accessToken')

if (!accessToken) {
  start(false)
} else {
  bindActionCreators(actions, store.dispatch)
  .fetchUserInfo(accessToken, function(err){
    // 判断是否是有效的token
    if (err) {
      location.reload()
    } else {
      start(true)
    }
  })
}

// 开始
function start(isSignin) {

  // 验证是否登录
  function requireAuth(nextState, replaceState) {
    if (!isSignin) {
      replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
  }

  class APP extends React.Component {
    render() { return this.props.children }
  }

  let box = document.createElement('div')
  document.getElementsByTagName('body')[0].appendChild(box)

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
  ), box);

}
