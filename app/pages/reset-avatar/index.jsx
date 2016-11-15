import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signout } from '../../actions/sign'
import { getUserInfo } from '../../reducers/user'
import { setLoadingDisplay } from '../../actions/loading'

import { changeNickname, loadUserInfo, cropAvatar } from '../../actions/user'

import Subnav from '../../components/subnav'
import FileUpload from '../../components/file-upload'

import avatarPicker from './avatar-picker'

import Shell from '../../shell'

class ResetAvatar extends Component {

  constructor(props) {
    super(props)
    this.submitResetPassword = this.submitResetPassword.bind(this)
  }

  submitResetPassword() {

    const self = this
    const { changeNickname, loadUserInfo } = this.props
    const { nickname } = this.refs

    if (!nickname.value) {
      nickname.focus()
      return
    }

    changeNickname({
      nickname: nickname.value,
      callback: function(err){
        if (err) {
          alert(err.error)
        } else {
          alert('昵称修改成功')
          loadUserInfo({})
          self.context.router.goBack()
        }
      }
    })

  }

  render() {

    const { user, cropAvatar, loadUserInfo, setLoadingDisplay } = this.props

    let options = {
      url: 'avatar',
      numberLimit: 1,
      uploadSuccess : function(resp){

        setLoadingDisplay(true)

        avatarPicker({
          img: resp.data,
          selectAreaScale: 0.9,
          previews: [],
          imgLoadComplete: function() {
            setLoadingDisplay(false)
          },
          done: function(area){
            cropAvatar({
              x: area.x,
              y: area.y,
              width: area.width,
              height: area.height,
              callback: function(){
                loadUserInfo({})
              }
            })
          }
        })
      }
    }

    return (
      <div>
        <Subnav
          middle="头像"
        />
        <div className="container">

          <div styleName="avatar">
            <img src={user.avatar_url.replace(/thumbnail/, "large")} />
          </div>

          <div className="list">

            <a className="center" href="javascript:void(0);" styleName="upload-button">
              <FileUpload options={options}>
                上传头像
              </FileUpload>
            </a>

          </div>

        </div>
      </div>
    )

  }

}

ResetAvatar.contextTypes = {
  router: PropTypes.object.isRequired
}

ResetAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  cropAvatar: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
  setLoadingDisplay: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cropAvatar: bindActionCreators(cropAvatar, dispatch),
    loadUserInfo: bindActionCreators(loadUserInfo, dispatch),
    setLoadingDisplay: bindActionCreators(setLoadingDisplay, dispatch)
  }
}

ResetAvatar = CSSModules(ResetAvatar, styles)

ResetAvatar = connect(mapStateToProps, mapDispatchToProps)(ResetAvatar)

export default Shell(ResetAvatar)
