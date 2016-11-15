import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

// 获取url中的参数，并返回
// new QueryString()
function QueryString() {
  var name,value,i;
  var str=location.href;
  var num=str.indexOf("?")
  str=str.substr(num+1);
  var arrtmp=str.split("&");
  for (i=0;i < arrtmp.length;i++) {
    num=arrtmp[i].indexOf("=");
    if(num>0) {
      name=arrtmp[i].substring(0,num);
      value=arrtmp[i].substr(num+1);
      this[name]=value;
    }
  }
}

// 是否是微信浏览器
function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}


class SubNav extends Component {

  constructor(props) {
    super(props)
    this.navigateBack = this.navigateBack.bind(this)
  }

  navigateBack() {

    if (!window.global.previousRouter) {
      browserHistory.push('/')
    } else {
      this.context.router.goBack()
    }

  }

  render() {

    let params = new QueryString()

    const { left = '返回', middle = '', right = '' } = this.props
    let back = <a href="javascript:;" onClick={this.navigateBack}>{left}</a>

    if (params.subnav_back) {
      back = <Link to={params.subnav_back}>{left}</Link>
    }

    if (is_weixn()) {
      return (<div></div>)
    }

    return (
      <div>
        <div styleName="subnav">
          <div className="container">
            <div>{back}</div>
            <div>{middle}</div>
            <div>{right}</div>
          </div>
        </div>
        {/* 占位 */}
        <div styleName="placeholder"></div>
      </div>
    )
  }
}

SubNav.contextTypes = {
  router: PropTypes.object.isRequired
}

SubNav = CSSModules(SubNav, styles)

export default SubNav
