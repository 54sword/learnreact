import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import Device from '../../common/device'

// import {Editor, EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, CompositeDecorator, convertFromRaw} from 'draft-js'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showSign } from '../../actions/sign'
import { isSignin } from '../../reducers/sign'
import { loadQuestionById } from '../../actions/questions'
import { getQuestionById } from '../../reducers/questions'

import Shell from '../../shell'
import Subnav from '../../components/subnav'
import Answers from '../../components/answers'
import FollowQuestion from '../../components/follow-question'
// import Iframe from 'react-iframe'
import Embed from '../../components/embed'
import Iframe from '../../components/iframe'

import Editer from '../../components/editer'

function getEntityStrategy(mutability) {
  return function(contentBlock, callback) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return Entity.get(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
}

const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    Entity.get(props.entityKey).getMutability()
  );
  return (
    <span {...props} style={style}>
      {props.children}
    </span>
  );
};

// -----

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'youku') {
    if (Device.isMobileDevice()) {
      let url = "http://player.youku.com/embed/" + src
      media = <Iframe src={url} frameborder="0" border="0" width="auto" height="auto" position="" allowfullscreen></Iframe>
      // media = <iframe src={url} frameborder="0" border="0" allowfullscreen></iframe>
    } else {
      let url = "http://player.youku.com/player.php/sid/"+src+"/v.swf"
      media = <Embed src={url}></Embed>
      // media = <embed src={url} allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>
    }
  } else if (type === 'tudou') {
    let url = "http://www.tudou.com/programs/view/html5embed.action?code="+src
    media = <Iframe src={url} allowtransparency="true" allowfullscreen="true" allowfullscreenInteractive="true" scrolling="no" border="0" frameborder="0" width="auto" height="auto" position=""></Iframe>
    // <iframe url={url} allowtransparency="true" allowfullscreen="true" allowfullscreenInteractive="true" scrolling="no" border="0" frameborder="0"></iframe>
    // let url = "http://www.tudou.com/"+src+"/&bid=&rpid=&resourceId=/v.swf"
    // media = <embed src={url} type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>
  } else if (type === 'qq') {
    if (Device.isMobileDevice()) {
      let url = "http://v.qq.com/iframe/player.html?vid="+src+"&tiny=0&auto=0"
      media = <Iframe frameborder="0" src={url} width="auto" height="auto" position="" allowfullscreen></Iframe>
      // media = <iframe frameborder="0" src={url} allowfullscreen></iframe>
    } else {
      let url = "http://static.video.qq.com/TPout.swf?vid="+src+"&auto=0"
      media = <Embed src={url}></Embed>
      // media = <embed src={url} allowFullScreen="true" quality="high" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
    }
  }

  return media;
};

// --

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

// ---

class Question extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {

    const { loadQuestionById } = this.props
    let [ question ] = this.props.question

    if (!question) {
      loadQuestionById()
    }
  }

  render () {

    let { isSignin, showSign } = this.props
    let [ question ] = this.props.question

    if (!question) {
      return (<div>loading...</div>)
    }
    /*
    const rawContent = JSON.parse(question.content)

    // console.log(question.content)

    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
      },
    ]);

    const blocks = convertFromRaw(rawContent);
    */

    return (

      <div>
        <Subnav
          left="返回"
          middle="内容正文"
        />

        <div className="container">

          <div styleName="question">
            <div styleName="questionHeader">
              <Link to={`/people/${question.user_id._id}`}>
                <img src={question.user_id.avatar_url} />
                {question.user_id.nickname}
              </Link>
            </div>
            <div styleName="questionTitle">
              <h1>{question.title}</h1>
            </div>
            <div styleName="questionDetail" className='RichEditor-editor'>

            {/*
            <Editor
              blockRendererFn={mediaBlockRenderer}
              editorState={EditorState.createWithContent(blocks, decorator)}
              blockStyleFn={getBlockStyle}
            readOnly/>
            */}

            <Editor
              syncContent = {(contentStateJSON, contentHTML) => {}}
              readOnly={false}
              content={question.content}
              />

            </div>
          </div>

          <div styleName="other">
            {question.answers_count} 个答案

            <FollowQuestion
              count={question.follow_count}
              status={question.follow}
              questionId={question._id}
              autherId={question.user_id._id}
            />

            {isSignin ?
              <Link to={`/add-answer/${question._id}`}>写答案</Link> :
              <a href="javascript:;" onClick={showSign}>写答案</a>
            }
          </div>

          <Answers
            name={this.props.location.pathname}
            filters={{ question_id: this.props.params.questionId }}
          />

        </div>

      </div>
    )
  }
}

Question.propTypes = {
  showSign: PropTypes.func.isRequired,
  isSignin: PropTypes.bool.isRequired,
  loadQuestionById: PropTypes.func.isRequired,
  question: PropTypes.array.isRequired,
}

function mapStateToProps(state, props) {
  return {
    isSignin: isSignin(state),
    question: getQuestionById(state, props.params.questionId)
  }
}

function mapDispatchToProps(dispatch, props) {

  return {
    showSign: bindActionCreators(showSign, dispatch),
    loadQuestionById: function(){
      bindActionCreators(loadQuestionById, dispatch)({
        questionId: props.params.questionId,
        callback: function(err){
          if (err) {
            props.displayNotFoundPage()
          }
        }
      })
    }
  }

}

Question = CSSModules(Question, styles)

let QuestionComponent = connect(mapStateToProps, mapDispatchToProps)(Question)

export default Shell(QuestionComponent)
