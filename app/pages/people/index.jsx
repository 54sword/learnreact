import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadPeopleById } from '../../actions/peoples'
import { getPeopleById } from '../../reducers/peoples'

import Shell from '../../shell'
import Subnav from '../../components/subnav'
import Tabbar from '../../components/tabbar'
import Questions from '../../components/questions'
import Answers from '../../components/answers'
import FollowPeople from '../../components/follow-people'
import NodeList from '../../components/node-list'
import PeopleList from '../../components/people-list'

class People extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
    this.setCurrentTab = this.setCurrentTab.bind(this)
  }

  componentWillMount() {
    const self = this
    const { loadPeopleById, displayNotFoundPage } = this.props
    const { peopleId } = this.props.params
    const [ people ] = this.props.peoples

    if (people) {
      self.props.setMeta({
        title: people.nickname
      })
      return
    }

    loadPeopleById({
      peopleId,
      callback: function(err, result){

        if (!result.success) {
          displayNotFoundPage()
        } else {
          self.props.setMeta({
            title: result.data.nickname
          })
        }

      }
    })
  }

  componentWillReceiveProps(props) {

    const { loadPeopleById, displayNotFoundPage } = this.props

    if (props && this.props.params.peopleId != props.params.peopleId) {
      loadPeopleById({
        peopleId: props.params.peopleId,
        callback: function(err, result){
          if (!result.success) {
            displayNotFoundPage()
          }
        }
      })
    }

  }

  setCurrentTab(index) {
    this.setState({
      currentTab: index
    })
  }

  render() {

    let { currentTab } = this.state
    const [ people ] = this.props.peoples
    const { setCurrentTab } = this

    if (!people) {
      return (<div>loading</div>)
    }

    return (
      <div>
        <Subnav middle={people.nickname} />

        <div className="container">
          <div styleName="header">
            <div styleName="actions">
              <span styleName="follow">
                <FollowPeople people={people} />
              </span>
            </div>
            <img src={people.avatar_url.replace(/thumbnail/, "large")} />
            <div>{people.nickname}</div>
            <div>{people.brief}</div>
            <br />

            <Tabbar
              tabs={[
                {
                  title: '<b>' + people.question_count + '</b><br />提问',
                  callback: function(){ setCurrentTab(0) }
                },
                {
                  title: '<b>' + people.answer_count + '</b><br />答案',
                  callback: function(){ setCurrentTab(1) }
                },
                {
                  title: '<b>' + people.follow_node_count + '</b><br />话题',
                  callback: function(){ setCurrentTab(2) }
                },
                {
                  title: '<b>' + people.follow_people_count + '</b><br />关注的人',
                  callback: function(){ setCurrentTab(3) }
                },
                {
                  title: '<b>' + people.fans_count + '</b><br />粉丝',
                  callback: function(){ setCurrentTab(4) }
                }
              ]}
            />
          </div>
        </div>

        {currentTab == 0 ?
          <Questions
            name={people._id}
            filters={{
              per_page: 20,
              user_id: people._id,
              gt_create_at: new Date().getTime()
            }}
          />
          :
          null
        }

        {currentTab == 1 ?
          <Answers
            name={people._id}
            filters={{
              user_id: people._id,
              date: new Date().getTime()
            }}
          />
          :
          null
        }

        {currentTab == 2 ? <NodeList name={people._id} userId={people._id} /> : null}
        {currentTab == 3 ?
          <PeopleList type={"follow-people"} peopleId={people._id} />
          : null}
        {currentTab == 4 ?
          <PeopleList type={"fans"} peopleId={people._id} />
          : null}

      </div>
    )

  }

}

People.propTypes = {
  peoples: PropTypes.array.isRequired,
  loadPeopleById: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    peoples: getPeopleById(state, props.params.peopleId)
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadPeopleById: bindActionCreators(loadPeopleById, dispatch)
  }
}

People = CSSModules(People, styles)

People = connect(mapStateToProps, mapDispatchToProps)(People)

export default Shell(People)
