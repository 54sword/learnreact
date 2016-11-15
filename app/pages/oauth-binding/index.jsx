import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { API_URL } from '../../../config/config'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import { loadUserInfo } from '../../actions/user'
import { unbindingQQ, unbindingWeibo } from '../../actions/oauth'
import { getAccessToken } from '../../reducers/sign'

import Subnav from '../../components/subnav'
import Shell from '../../shell'

class OauthBinding extends Component {

  constructor(props) {
    super(props)
    this.binding = this.binding.bind(this)
    this.unbinding = this.unbinding.bind(this)
  }

  binding() {
    const { accessToken } = this.props
    const { source } = this.props.params

    if (source == 'qq' && confirm('您确认绑定 QQ 吗？')) {
      window.location.href = 'http://api.xiaoduyu.com/oauth/qq?access_token='+accessToken;
    } else if (source == 'weibo' && confirm('您确认绑定 微博 吗？')) {
      window.location.href = 'http://api.xiaoduyu.com/oauth/weibo?access_token='+accessToken;
    }
  }

  unbinding() {
    const { unbindingQQ, unbindingWeibo, loadUserInfo, accessToken } = this.props
    const { source } = this.props.params

    if (source == 'qq' && confirm('您确认解除 QQ 绑定吗？')) {
      unbindingQQ({
        callback: function(err, result){
          loadUserInfo(accessToken)
          alert('解除绑定成功')
        }
      })
    } else if (source == 'weibo' && confirm('您确认解除 微博 绑定吗？')) {
      unbindingWeibo({
        callback: function(err, result){
          loadUserInfo(accessToken)
          alert('解除绑定成功')
        }
      })
    }
  }

  render() {

    const { me, displayNotFoundPage } = this.props
    const { source } = this.props.params

    if (source == 'qq' || source == 'weibo') {

      return (
        <div>
          <Subnav middle="修改性别" />
          <div className="container">
            <div className="list">
              {me[source] ?
                <a href="javascript:void(0)" onClick={this.unbinding}>解除绑定</a>
                :
                <a href="javascript:void(0)" onClick={this.binding}>绑定</a>
              }
            </div>
          </div>
        </div>
      )

    } else {
      displayNotFoundPage()
      // return(<div></div>)
    }

  }

}

OauthBinding.contextTypes = {
  router: PropTypes.object.isRequired
}

OauthBinding.propTypes = {
  me: PropTypes.object.isRequired,
  accessToken: PropTypes.string.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
  unbindingQQ: PropTypes.func.isRequired,
  unbindingWeibo: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    me: getUserInfo(state),
    accessToken: getAccessToken(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
    unbindingQQ: bindActionCreators(unbindingQQ, dispatch),
    unbindingWeibo: bindActionCreators(unbindingWeibo, dispatch)
  }
}

OauthBinding = connect(
  mapStateToProps,
  mapDispatchToProps
)(OauthBinding)


export default Shell(OauthBinding)
