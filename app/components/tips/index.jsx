import React, { Component } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './style.scss'

import Subnav from '../../components/subnav'

class Tips extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const { title } = this.props
    return (
      <div styleName="text">
        {title ? title : '不存在这个页面'}
        <div>
          <Link to="/">返回首页</Link>
        </div>
      </div>
    )
  }
}

Tips = CSSModules(Tips, styles)

export default Tips
