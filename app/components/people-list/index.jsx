import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import arriveFooter from '../../common/arrive-footer'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadFollowPeoples, loadFans } from '../../actions/follow-peoples'
import { getPeoples, getLoading, getMore } from '../../reducers/peoples'

import PeopleItem from './components/people-item'

class FollowPeoplesList extends Component{

  constructor(props) {
    super(props)
    this.triggerLoad = this._triggerLoad.bind(this)
  }

  componentDidMount() {

    const self = this
    const { peoples, type, peopleId } = this.props

    if (peoples.length == 0) {
      self.triggerLoad()
    }

    arriveFooter.add(type+'-'+peopleId, ()=>{
      self.triggerLoad()
    })

  }

  componentWillUnmount() {
    const { peoples, type, peopleId } = this.props
    arriveFooter.remove(type+'-'+peopleId)
  }

  _triggerLoad(callback) {
    const { loadFollowPeoples, loadFans, type, peopleId } = this.props

    const handle = type == 'follow-people' ? loadFollowPeoples : loadFans

    handle({
      name: type+'-'+peopleId,
      data: {
        user_id: peopleId
      },
      callback: (err, callback) => {
      }
    })

  }

  render () {
    const { peoples, loading, more } = this.props

    return (<div className="container">
      {peoples.map(people=>{
        return (<Link to={`/people/${people._id}`} key={people._id}>
            <PeopleItem people={people} />
          </Link>)
      })}
      {loading ? 'loading...' : null}
      {!more ? '没有更多了' : null}
    </div>)

  }

}

FollowPeoplesList.propTypes = {
  type: PropTypes.string.isRequired,
  peopleId: PropTypes.string.isRequired,

  loadFollowPeoples: PropTypes.func.isRequired,
  loadFans: PropTypes.func.isRequired,
  peoples: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  more: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    peoples: getPeoples(state, props.type+'-'+props.peopleId),
    loading: getLoading(state, props.type+'-'+props.peopleId),
    more: getMore(state, props.type+'-'+props.peopleId)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadFollowPeoples: bindActionCreators(loadFollowPeoples, dispatch),
    loadFans: bindActionCreators(loadFans, dispatch)
  }
}

FollowPeoplesList = CSSModules(FollowPeoplesList, styles)

export default connect(mapStateToProps, mapDispatchToProps)(FollowPeoplesList)
