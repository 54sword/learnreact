import React, { Component, PropTypes } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadNodes } from '../../actions/nodes'
// import { getNodeById } from '../../reducers/nodes'

import Shell from '../../shell'
import Subnav from '../../components/subnav'
import Questions from '../../components/questions'
import NodeItem from '../../components/node-item'

class Topic extends Component {

  constructor(props) {
    super(props)
    this.state = {
      node: null
    }
  }

  componentWillMount() {
    const self = this
    let { fetchNodes } = this.props

    fetchNodes((err, result)=>{
      // console.log(err, result)
      if (!err) {
        self.setState({
          node: result[0]
        })
      }
    })

  }

  render() {
    const { pathname } = this.props.location
    const { topicId } = this.props.params
    let { node } = this.state
    const self = this

    if (!node) {
      return (<div>正在加载主题中...</div>)
    }

    return (
      <div>
        <Subnav left="返回" middle="话题列表" />
        <div className="container">
          <NodeItem node={node} />
        </div>
        <Questions
          name={pathname}
          filters={{
            per_page: 5,
            node_id: topicId,
            gt_create_at: new Date().getTime()
          }}
        />
      </div>
    )
  }

}

Topic.propTypes = {
  // node: PropTypes.array.isRequired,
  fetchNodes: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    // node: getNodeById(state, props.params.topicId)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchNodes: function(callback){

      bindActionCreators(loadNodes, dispatch)({
        node_id: props.params.topicId
      }, function(err, result){
        if (err || !result.success) {
          props.displayNotFoundPage()
          return
        }
        callback(err, result.data)
      })

    }
  }
}

Topic = CSSModules(Topic, styles)

let TopicComponent = connect(mapStateToProps, mapDispatchToProps)(Topic)

export default Shell(TopicComponent)
