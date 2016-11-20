import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory } from 'react-router'
import DocumentMeta from 'react-document-meta'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addQuestion } from '../../actions/questions'
import { loadNodes } from '../../actions/nodes'
import { getNodes } from '../../reducers/nodes'

import Subnav from '../../components/subnav'
import Shell from '../../shell'
import Editor from '../../components/editor'

class AddQuestion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nodes: [],
      contentStateJSON: '',
      contentHTML: ''
    }
    this.submitQuestion = this.submitQuestion.bind(this)
    this.sync = this.sync.bind(this)
  }

  sync(contentStateJSON, contentHTML) {
    this.state.contentStateJSON = contentStateJSON
    this.state.contentHTML = contentHTML
    // console.log(this.state.contentStateJSON)
  }

  componentWillMount() {
    this.props.setMeta({
      title: '提问'
    })
  }

  componentDidMount() {
    const self = this
    const { loadNodes } = this.props
    loadNodes({
      name: 'add-question',
      data: { child: 1, per_page:2000 },
      callback: (err, result)=>{
        /*
        self.setState({
          nodes: result.data
        })
        */
      }
    })
  }

  submitQuestion() {

    let self = this
    let { questionTitle, questionNode } = this.refs
    let { addQuestion } = this.props
    const { contentStateJSON } = this.state

    if (!questionTitle.value) {
      questionTitle.focus()
      return
    }

    if (!questionNode.value) {
      alert('请选择话题分类')
      return
    }

    addQuestion({
      title: questionTitle.value,
      detail: contentStateJSON,
      nodeId: questionNode.value,
      device: 1,
      callback: function(err, question){
        browserHistory.push('question/'+question._id+'?subnav_back=/')
      }
    })

  }

  render() {

    const { nodes } = this.props

    return (<div>
      <Subnav
        left="取消"
        middle="创建主题"
      />
      <div className="container">
        <div styleName="addQuestion">
          <div><input styleName="questionTitle" className="input" ref="questionTitle" type="text" placeholder="请输入标题"  /></div>
          <div>
            <Editor syncContent={this.sync} />
          </div>
          <div>
            <select ref="questionNode" styleName="nodes">
              <option value={0}>请选择话题</option>
              {nodes.map(node=>{
                return (<option value={node._id} key={node._id}>{node.name}</option>)
              })}
            </select>
            <button className="button" styleName="submit" onClick={this.submitQuestion}>提交</button>
          </div>
        </div>
      </div>
    </div>)
  }

}

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  loadNodes: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    nodes: getNodes(state, 'add-question')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: bindActionCreators(addQuestion, dispatch),
    loadNodes: bindActionCreators(loadNodes, dispatch)
  }
}

AddQuestion = CSSModules(AddQuestion, styles)

AddQuestion = connect(mapStateToProps, mapDispatchToProps)(AddQuestion)

export default Shell(AddQuestion)
