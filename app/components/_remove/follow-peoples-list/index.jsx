import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadFollowPeoples } from '../../actions/follow-peoples'

import FollowPeople from '../../components/follow-people'

class FollowPeoplesList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      peopleList: [],
      page: 0,
      perPage: 20,
      userId: this.props.userId,
      loading: false,
      more: true
    }
    this.triggerLoad = this.triggerLoad.bind(this)
  }

  componentDidMount() {

    const self = this

    self.triggerLoad()

    // 监听滚动条是否
    var $window = $(window)
    var $document = $(document)
    $window.scroll(function(){
      if ($document.scrollTop() + $window.height() >= $document.height() - 150) {
        self.triggerLoad()
      }
    })

  }

  componentWillUnmount() {
    // 离开页面的时候，注意接触绑定的事件
    $(window).unbind('scroll')
  }

  triggerLoad(callback) {
    const { loadFollowPeoples } = this.props
    const { peopleList, page, perPage, userId, loading, more } = this.state
    const self = this

    if (!more || loading) {
      return
    }

    self.setState({
      loading: true
    })

    loadFollowPeoples({
      page, perPage, userId, callback: function(err, peoples){

        self.setState({
          loading: false,
          more: peoples.length < perPage ? false : true,
          page: page+1,
          peopleList: peopleList.concat(peoples)
        })

      }
    })
  }

  render () {

    const self = this
    const { peopleList, loading, more } = this.state

    return (<div className="container">
      {peopleList.map(people=>{
        people = people.follow_id
        return (<Link to={`/people/${people._id}`} key={people._id}><div styleName="people-item">
          <span styleName="follow">
            <FollowPeople people={people} />
          </span>
          <img styleName="avatar" src={people.avatar_url} />
          <div>{people.nickname}</div>
          <div>{people.fans_count} 粉丝 | {people.question_count} 提问 ｜ {people.answer_total} 答案</div>
        </div></Link>)
      })}
      {loading ? 'loading...' : null}
      {!more ? '没有更多了' : null}
    </div>)
  }

}

FollowPeoplesList.propTypes = {
  loadFollowPeoples: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadFollowPeoples: bindActionCreators(loadFollowPeoples, dispatch)
  }
}

FollowPeoplesList = CSSModules(FollowPeoplesList, styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowPeoplesList)