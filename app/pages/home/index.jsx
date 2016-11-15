import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import cookie from 'react-cookie'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isSignin } from '../../reducers/sign'
import { showSign } from '../../actions/sign'
import { getUserInfo } from '../../reducers/user'

import Shell from '../../shell'
import Nav from '../../components/nav'
import Questions from '../../components/questions'
import Editor from '../../components/editor'

import styles from './index.scss'

class Home extends Component {

  constructor(props) {
    super(props)

    let tab = cookie.load('tab')

    this.state = {
      currentTab: 0,
      tabs: [
        {
          name:'发现',
          filters: {
            per_page: 20,
            gt_create_at: new Date().getTime()
          }
        },
        {
          name:'我的关注',
          filters: {
            per_page: 20,
            gt_create_at: new Date().getTime(),
            method: 'user_custom'
          }
        }
      ]
    }

    if (tab && this.state.tabs[tab]) {
      this.state.currentTab = tab
    }

    this.toTab = this.toTab.bind(this)
  }

  toTab(key) {
    this.setState({
      currentTab: key
    })

    cookie.save('tab', key, { expires: new Date( new Date().getTime() + 1000*60*60*24*365 ), path: '/' })
  }

  render() {
    const { isSignin, showSign, followPeoples } = this.props
    const { currentTab, tabs } = this.state

    return (
      <div>
        <Nav />
        {isSignin ?
          <div className="container">
            <div styleName="tab">
              {tabs.map((tab, key) => {
                return (<a href="javascript:void(0)" key={key} onClick={()=>{this.toTab(key)}} className={currentTab == key ? 'active' : ''}>{tab.name}</a>)
              })}
            </div>
          </div>
        : null}

        <div className="container">
          {isSignin ?
            <div>
              <Link to="/add-question" styleName="addQuestion">你对什么事物感到好奇？</Link>
            </div>
            :
            <a href="javascript:;" styleName="addQuestion" onClick={showSign}>你对什么事物感到好奇？</a>}
        </div>



        <Questions
          name="home"
          filters={tabs[currentTab].filters}
          update={currentTab}
        />

      </div>
    )
  }

}

Home.propTypes = {
  isSignin: PropTypes.bool.isRequired,
  showSign: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  followPeoples: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isSignin: isSignin(state),
    userProfile: getUserInfo(state),
    followPeoples: function(){
      return state.user.followPeoples.join(',')
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSign: bindActionCreators(showSign, dispatch)
  }
}
Home = CSSModules(Home, styles)

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


export default Shell(Home)
