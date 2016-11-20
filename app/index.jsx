import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import cookie from 'react-cookie'

import config from '../config/config'

// css 样式
import styles from './pages/global/global.scss'

// 页面
import Home from './pages/home'
import Topics from './pages/topics'
import Topic from './pages/topic'
import Question from './pages/question'
import Me from './pages/me'
import Settings from './pages/settings'
import ResetPassword from './pages/reset-password'
import ResetNickname from './pages/reset-nickname'
import ResetGender from './pages/reset-gender'
import ResetBrief from './pages/reset-brief'
import ResetAvatar from './pages/reset-avatar'
import ResetEmail from './pages/reset-email'
import VerifyEmail from './pages/verify-email'
import BindingEmail from './pages/binding-email'

import Forgot from './pages/forgot'

import MeQuestions from './pages/me-questions'
import MeAnswers from './pages/me-answers'
import MeFollowNodes from './pages/me-follow-nodes'
import MeFollowPeoples from './pages/me-follow-peoples'
import MeFans from './pages/me-fans'

import NotFound from './pages/not-found'
import Answer from './pages/answer'
import Comments from './pages/comments'
import AddComment from './pages/add-comment'
import AddAnswer from './pages/add-answer'
import signupEmailVerify from './pages/signup-email-verify'
import AddQuestion from './pages/add-question'
import People from './pages/people'
import Oauth from './pages/oauth'
import OauthBinding from './pages/oauth-binding'


import Notification from './pages/notifications'

// ----

// google 分析
import ReactGA from 'react-ga'
ReactGA.initialize(config.GA)

function logPageView() {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

// ----

import { bindActionCreators } from 'redux'
import { loadUserInfo, addAccessToken, removeAccessToken } from './actions/user'
import { loadUnreadCount } from './actions/notification'

import configureStore from './store/configure-store'
let store = configureStore()

// 开始
function start(isSignin) {

  window.global = {}

  // 验证是否登录
  const requireAuth = (nextState, replaceState) => {

    if (!isSignin) {
      replaceState({
        pathname: '/',
        query: {},
        state: { nextPathname: nextState.location.pathname }
      })
      return
    }

    triggerEnter(nextState, replaceState)
  }

  const triggerEnter = (nextState, replaceState) => {
    // console.log(nextState.location.pathname)
    window.global.currentRouter = nextState.location.pathname
  }

  const triggerLeave = (nextState, replaceState) => {
    // console.log(window.global.previousRouter)
    window.global.previousRouter = window.global.currentRouter
  }

  class APP extends React.Component {
    render() {
      return this.props.children
    }
  }

  let box = document.createElement('div')
  document.getElementsByTagName('body')[0].appendChild(box)

  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={APP} onUpdate={logPageView}>
          <IndexRoute
            component={Home}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="topics"
            component={Topics}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="topic/:topicId"
            component={Topic}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="question/:questionId"
            component={Question}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="answer/:answerId"
            component={Answer}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="comment/:answerId"
            component={Comments}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="add-comment/:answerId"
            component={AddComment}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="signup-email-verify/:code"
            component={signupEmailVerify}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="me"
            component={Me}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings"
            component={Settings}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/reset-password"
            component={ResetPassword}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/reset-nickname"
            component={ResetNickname}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/reset-gender"
            component={ResetGender}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/reset-brief"
            component={ResetBrief}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/reset-avatar"
            component={ResetAvatar}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/verify-email"
            component={VerifyEmail}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/reset-email"
            component={ResetEmail}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="settings/binding-email"
            component={BindingEmail}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="me/questions"
            component={MeQuestions}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="me/answers"
            component={MeAnswers}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="me/follow-nodes"
            component={MeFollowNodes}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="me/follow-peoples"
            component={MeFollowPeoples}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="me/fans"
            component={MeFans}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="add-question"
            component={AddQuestion}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="add-answer/:questionId"
            component={AddAnswer}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="people/:peopleId"
            component={People}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="notifications"
            component={Notification}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="forgot"
            component={Forgot}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="oauth"
            component={Oauth}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
          <Route path="oauth-binding/:source"
            component={OauthBinding}
            onLeave={triggerLeave}
            onEnter={requireAuth}
          />
          <Route path="*"
            component={NotFound}
            onLeave={triggerLeave}
            onEnter={triggerEnter}
          />
        </Route>
      </Router>
    </Provider>
  ), box);

}


// ---
// 如果包含accessToken 那么验证是否有效
let accessToken = cookie.load('accessToken')

if (!accessToken) {
  start(false)
} else {
  bindActionCreators(loadUserInfo, store.dispatch)({
    accessToken,
    callback: function(err){

      // 判断是否是有效的token
      if (err) {
        store.dispatch(removeAccessToken())
        location.reload()
        return
      }

      store.dispatch(addAccessToken(accessToken))

      bindActionCreators(loadUnreadCount, store.dispatch)()

      start(true)

      /*
      bindActionCreators(loadFollowPeoples, store.dispatch)({
        callback: function() {

        }
      })
      */

      /*
      bindActionCreators(loadFollowNodes, store.dispatch)({
        callback: function() {
        }
      })
      */
    }
  })
}
