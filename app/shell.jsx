import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setScrollPosition, saveScrollPosition } from './actions/scroll'
import { getSignStatus } from './reducers/sign'
import { getLoadingStatus } from './reducers/loading'
import { setLoadingDisplay } from './actions/loading'

import Sign from './components/sign'
import NotFound from './pages/not-found'
import Loading from './components/loading'

const Shell = (_component) => {

  class CP extends Component {

    constructor(props) {
      super(props)
      this.state = {
        notFound: false
      }
      this.displayNotFoundPage = this.displayNotFoundPage.bind(this)
      this.setLoadingDisplay = this.setLoadingDisplay.bind(this)
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

    render() {

      const { signStatus, loadingStatus } = this.props
      let { notFound } = this.state

      if (notFound) {
        return (<NotFound />)
      }

      return (<div>
        {signStatus ? <Sign /> : null}
        {loadingStatus ? <Loading /> : null}
        <this.props.component
          {...this.props}
          displayNotFoundPage={this.displayNotFoundPage}
          setLoadingDisplay={this.setLoadingDisplay}
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
