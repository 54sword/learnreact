import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import DocumentMeta from 'react-document-meta'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setScrollPosition, saveScrollPosition } from './actions/scroll'
import { getSignStatus } from './reducers/sign'
import { getLoadingStatus } from './reducers/loading'
import { setLoadingDisplay } from './actions/loading'

import Sign from './components/sign'
import NotFound from './pages/not-found'
import Loading from './components/loading'

import config from '../config/config'

import Weixin from './common/weixin'

const Shell = (_component) => {

  class CP extends Component {

    constructor(props) {
      super(props)
      this.state = {
        notFound: false,
        meta: {
          title: config.name,
          description: config.description
        }
      }
      this.displayNotFoundPage = this.displayNotFoundPage.bind(this)
      this.setLoadingDisplay = this.setLoadingDisplay.bind(this)
      this.setMeta = this._setMeta.bind(this)
    }

    displayNotFoundPage() {
      this.setState({
        notFound: true
      })
    }

    setLoadingDisplay(bl) {
      const { setLoadingDisplay } = this.props
      setLoadingDisplay(bl)
    }

    _setMeta(meta) {

      meta.title = meta.title ? meta.title + ' - ' + config.name : config.name

      this.setState({
        meta: meta
      })

      if (Weixin.in) {

        var $body = $('body')
        document.title = meta.title
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
          setTimeout(function() {
            $iframe.off('load').remove()
          }, 0)
        }).appendTo($body)

      }

    }

    render() {

      const { signStatus, loadingStatus } = this.props
      let { notFound } = this.state

      if (notFound) {
        return (<NotFound />)
      }

      return (<div>
        <DocumentMeta {...this.state.meta} />
        {signStatus ? <Sign /> : null}
        {loadingStatus ? <Loading /> : null}
        <this.props.component
          {...this.props}
          displayNotFoundPage={this.displayNotFoundPage}
          setLoadingDisplay={this.setLoadingDisplay}
          setMeta={this.setMeta}
        />
      </div>)
    }

    // 组件加载完成
    componentDidMount() {
      // console.log('组件加载完成')
      // 设置滚动条位置
      this.props.setScrollPosition(this.props.location.pathname)
    }

    // 更新组件
    componentDidUpdate() {
      // console.log('组件被更新了')
    }

    // 组件被卸载
    componentWillUnmount() {
      // console.log('组件卸载完成')
      // 储存滚动条位置
      this.props.saveScrollPosition(this.props.location.pathname)
    }

  }

  CP.defaultProps = {
    component: _component
  }

  CP.propTypes = {
    setScrollPosition: PropTypes.func.isRequired,
    saveScrollPosition: PropTypes.func.isRequired,
    signStatus: PropTypes.bool.isRequired,
    loadingStatus: PropTypes.bool.isRequired,
    setLoadingDisplay: PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => {
    return {
      signStatus: getSignStatus(state),
      loadingStatus: getLoadingStatus(state)
    }
  }

  const mapDispatchToProps = (dispatch, props) => {
    return {
      setScrollPosition: bindActionCreators(setScrollPosition, dispatch),
      saveScrollPosition: bindActionCreators(saveScrollPosition, dispatch),
      setLoadingDisplay: bindActionCreators(setLoadingDisplay, dispatch)
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(CP)
}


export default Shell
