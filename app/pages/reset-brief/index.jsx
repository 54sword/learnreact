import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'

import { resetBrief, loadUserInfo } from '../../actions/user'

import Subnav from '../../components/subnav'

class ResetBrief extends Component {

  constructor(props) {
    super(props)
    this.submitResetBrief = this.submitResetBrief.bind(this)
  }

  componentDidMount() {
    const { brief } = this.refs
    brief.focus()
  }

  submitResetBrief() {

    const self = this
    const { resetBrief, loadUserInfo } = this.props
    const { brief } = this.refs

    resetBrief({
      brief: brief.value,
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
        <Subnav middle="个性签名" />
        <div className="container">
          <div className="list">
            <textarea defaultValue={user.brief} ref="brief"></textarea>
          </div>
          <div className="list">
            <a className="center" href="javascript:void(0);" onClick={this.submitResetBrief}>保存</a>
          </div>
        </div>
      </div>
    )

  }

}

ResetBrief.contextTypes = {
  router: PropTypes.object.isRequired
}

ResetBrief.propTypes = {
  user: PropTypes.object.isRequired,
  resetBrief: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetBrief: bindActionCreators(resetBrief, dispatch),
    loadUserInfo: bindActionCreators(loadUserInfo, dispatch)
  }
}

// ResetBrief = CSSModules(ResetBrief, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetBrief)
