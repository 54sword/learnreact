import React from 'react';
import ReactDOM from 'react-dom';
import './welcome.scss';
import '../static/js/libs/jquery.cookie.js';
import { Link, browserHistory } from 'react-router';

export default class Plist extends React.Component {

  componentWillMount() {
    // 如果已经登录，那么验证token是否有效，如果有效则跳转到首页
    if ($.cookie('accessToken')) {
      browserHistory.push('/');
    }
  }

  render () {
    return (
      <div className="container">
        {this.props.children}
        <div>
          第三方账号登录：
          <ul>
            <li>微信</li>
            <li>微博</li>
            <li>QQ</li>
          </ul>
        </div>
      </div>
    )
  }
}
