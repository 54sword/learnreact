import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, Link, IndexLink, IndexRoute, browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../../actions'

import Nav from '../../components/nav'

import styles from './index.scss'

var webapi = require('../../utils/api')

class AddQuestion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nodes: []
    }
    this.submitQuestion = this.submitQuestion.bind(this)
  }

  componentWillMount() {
    let self = this

    let { user } = this.props

    webapi.fetchAllNode(function(err, res){
      if (res.success) {
        self.setState({
          nodes: res.data
        })
      }
    });
  }

  submitQuestion() {
    let { questionTitle, questionDetail, questionNode } = this.refs
    let { user } = this.props

    webapi.addQuestion({
      title: questionTitle.value,
      detail: questionDetail.value,
      nodeId: questionNode.value,
      device: 1
    }, user.token, function(err, res){
      if (err) {
        alert(err);
        return;
      }
      window.location.href = './question/'+res.data._id
    });
  }

  render() {

    // Redirect(null, '/');

    if (this.state.nodes.length <= 0) {
      return (<div>loading...</div>)
    }

    return (<div>
      <Nav />
      <div className="container">
        <h4>提出你的问题，让更多人帮助你解答</h4>
        <div>问题标题</div>
        <div><input className={styles.questionTitle} ref="questionTitle" type="text"  /></div>
        <div>问题内容</div>
        <div><textarea className={styles.questionDetail} ref="questionDetail"></textarea></div>
        <div>
          <select className={styles.nodes} ref="questionNode">
            {this.state.nodes.map(parent=>{
              return parent.children.map(node=>{
                return (<option value={node.id}>{node.name}</option>)
              })
            })}
          </select>
        </div>
        <div><button className={styles.submit} onClick={this.submitQuestion}>提交</button></div>
      </div>
    </div>)
  }

}

AddQuestion.propTypes = {
  user: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}


// export default AddQuestion;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion)
