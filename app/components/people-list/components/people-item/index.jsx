import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import FollowButton from './components/follow'

class PeopleItem extends Component {

  constructor(props) {
    super(props)
    const { people } = this.props
    this.state = {
      people: people
    }
  }

  render () {

    const self = this
    const { people } = this.state

    return (
      <div styleName="people-item">
        <span styleName="follow">
          <FollowButton
            people={people}
            callback={(status)=>{
              people.follow = status
              people.fans_count += status ? 1 : -1
              self.setState({
                people: people
              })
            }}
          />
        </span>
        <img styleName="avatar" src={people.avatar_url} />
        <div>{people.nickname}</div>
        <div>{people.fans_count} 粉丝 | {people.question_count} 提问 ｜ {people.answer_count} 答案</div>
      </div>
    )

  }

}


PeopleItem = CSSModules(PeopleItem, styles)

export default PeopleItem
