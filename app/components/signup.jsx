import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

export default class Plist extends React.Component {

  constructor(props) {
    super(props)
    this.signup = this.signup.bind(this)
  }

  componentWillMount() {
    // 如果已经登录，那么验证token是否有效，如果有效则跳转到首页
    // if ($.cookie('accessToken')) {
      // browserHistory.push('./');
    // }
  }

  signup(event) {
    event.preventDefault();
  }

  render () {
    // <Link to="/welcome/signin">已经有账号</Link>

    return (
      <form id="signup" onSubmit={this.signup}>
        <h1>注册</h1>
        <p>昵称 <input type="text" ref="nickname" /></p>
        <p>邮箱 <input type="text" ref="email" /></p>
        <p>密码 <input type="password" ref="password" /></p>
        <p><input type="submit" value="注册" /></p>
      </form>
    )
  }
}
