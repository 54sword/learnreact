import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import { resetGender, loadUserInfo } from '../../actions/user'

import Subnav from '../../components/subnav'

import Shell from '../../shell'

class ResetGender extends Component {

  constructor(props) {
    super(props)
    this.submitResetGender = this.submitResetGender.bind(this)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '修改性别'
    })
  }

  submitResetGender(isMale) {

    const self = this
    const { user, resetGender, loadUserInfo } = this.props

    if (isMale && user.gender == 1 || !isMale && user.gender == 0) {
      return
    }

    resetGender({
      gender: isMale ? 1 : 0,
      callback: function(err){
        if (err) {
          alert(err.error)
        } else {
          loadUserInfo({})
          alert('修改成功')
          self.context.router.goBack()
        }
      }
    })

  }

  render() {

    const { user } = this.props

    return (
      <div>
        <Subnav middle="修改性别" />
        <div className="container">
          <div className="list">
            <a className={user.gender == 1 ? "hook" : ""} href="javascript:void(0)" onClick={()=>{ this.submitResetGender(true) }}>男</a>
            <a className={user.gender == 0 ? "hook" : ""} href="javascript:void(0)" onClick={()=>{ this.submitResetGender(false) }}>女</a>
          </div>
        </div>
      </div>
    )

  }

}

ResetGender.contextTypes = {
  router: PropTypes.object.isRequired
}

ResetGender.propTypes = {
  user: PropTypes.object.isRequired,
  resetGender: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetGender: bindActionCreators(resetGender, dispatch),
    loadUserInfo: bindActionCreators(loadUserInfo, dispatch)
  }
}

ResetGender = connect(mapStateToProps, mapDispatchToProps)(ResetGender)

export default Shell(ResetGender)
