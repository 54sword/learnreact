
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAccessToken } from '../../reducers/sign'

// import 'immutable'
import {Editor, EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw} from 'draft-js';
// import {stateToHTML} from 'draft-js-export-html'
// import draftToHtml from 'draftjs-to-html'
import FileUpload from '../../components/file-upload'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import './Draft.css'
import './RichEditor.css'

import { API_URL } from '../../../config/config'
// import

import Device from '../../common/device'

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}



class StyleButton extends React.Component {

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  // {label: 'H1', style: 'header-one'},
  // {label: 'H2', style: 'header-two'},
  // {label: 'H3', style: 'header-three'},
  // {label: 'H4', style: 'header-four'},
  // {label: 'H5', style: 'header-five'},
  // {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};


// -----

var INLINE_STYLES = [
  {label: '加粗', style: 'BOLD'},
  {label: '斜体', style: 'ITALIC'},
  {label: '下划线', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'}
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
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
      media = <iframe src={url} frameborder="0" border="0" allowfullscreen></iframe>
    } else {
      let url = "http://player.youku.com/player.php/sid/"+src+"/v.swf"
      media = <embed src={url} allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>
    }
  } else if (type === 'tudou') {
    let url = "http://www.tudou.com/programs/view/html5embed.action?code="+src
    media = <iframe src={url} allowtransparency="true" allowfullscreen="true" allowfullscreenInteractive="true" scrolling="no" border="0" frameborder="0"></iframe>
    // let url = "http://www.tudou.com/"+src+"/&bid=&rpid=&resourceId=/v.swf"
    // media = <embed src={url} type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>
  } else if (type === 'qq') {
    if (Device.isMobileDevice()) {
      let url = "http://v.qq.com/iframe/player.html?vid="+src+"&tiny=0&auto=0"
      media = <iframe frameborder="0" src={url} allowfullscreen></iframe>
    } else {
      let url = "http://static.video.qq.com/TPout.swf?vid="+src+"&auto=0"
      media = <embed src={url} allowFullScreen="true" quality="high" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
    }
  }

  return media;
};

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    const { syncContent } = this.props

    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      this.setState({editorState});
      const content = editorState.getCurrentContent()
      syncContent(JSON.stringify(convertToRaw(content)), '');
    }
    this.addImage = this._addImage.bind(this)
    this.addVideo = this._addVideo.bind(this)
    this.submitQuestion = this._submitQuestion.bind(this)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _addImage(url) {
    this._promptForMedia('image', url);
    // this._promptForMedia('image', "https://www.baidu.com/img/bd_logo1.png");
  }

  _addVideo() {

    let url = prompt("请输入视频地址，目前支持优酷、腾讯、土豆","");

    if (!url) {
      return
    }

    if (url.indexOf('qq.com') > -1) {

      let id = url.match(/\?vid\=([0-9a-zA-z\_]{1,})$/) || []
      id = id.length > 0 ? id[1] : ''

      if (!id) {
        id = url.match(/\/([0-9a-zA-z\_]{1,})\.html/)
        id = id[1]
      }

      if (id) {
        this._promptForMedia('qq', id)
      } else {
        alert('添加失败，可能是不支持该地址格式')
      }

    } else if (url.indexOf('youku.com') > -1) {

      let id = url.match(/\/id\_(.*)\.html/)
      id = id[1]

      if (id) {
        this._promptForMedia('youku', id)
      } else {
        alert('添加失败，可能是不支持该地址格式')
      }

    } else if (url.indexOf('tudou.com') > -1) {

      let id = url.match(/\/albumplay\/([0-9a-zA-z\_\-]{1,})\/([0-9a-zA-z\_\-]{1,})\.html/) || []
      id = id.length > 0 ? id[2] : ''

      if (!id) {
        id = url.match(/\/view\/([0-9a-zA-z\_]{1,})\//) || []
        id = id.length > 0 ? id[1] : ''
      }

      if (!id) {
        id = url.match(/\/listplay\/([0-9a-zA-z\_\-]{1,})\/([0-9a-zA-z\_\-]{1,})(?=\.html|\/)/) || []
        id = id.length > 0 ? id[2] : ''
      }

      if (id) {
        this._promptForMedia('tudou', id)
      } else {
        alert('添加失败，可能是不支持该地址格式')
      }

    }

  }

  _promptForMedia(type, src) {

    const {editorState } = this.state;
    const entityKey = Entity.create(type, 'IMMUTABLE', {src: src})

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      )
    });

  }

  _submitQuestion() {

    const { syncContent } = this.props

    const { editorState } = this.state
    const content = editorState.getCurrentContent()

    // console.log(content)

    // console.log(convertToRaw(content))

    syncContent(JSON.stringify(convertToRaw(content)), '');
    /*
    let options = {
      inlineStyles: {
        // Override default element (`strong`).
        BOLD: {element: 'b'},
        ITALIC: {
          // Add custom attributes. You can also use React-style `className`.
          attributes: {class: 'foo'},
          // Use camel-case. Units (`px`) will be added where necessary.
          style: {fontSize: 12}
        },
        // Use a custom inline style. Default element is `span`.
        RED: {style: {color: '#900'}},
      },
      blockRenderers: {
        ATOMIC: (block) => {



          let data = block.getData();

          console.log(data)

          if (data.foo === 'bar') {
            return '<div>' + escape(block.getText()) + '</div>';
          }
        },
        BOLD: (block) => {
          console.log(block)
        }
      }
    };
    let html = stateToHTML(content, options);
    console.log(html)
    */
  }

  render() {

    const { accessToken, setLoadingDisplay } = this.props
    const self = this

    const options = {
      url: 'image',
      uploadSuccess: (resp) => {
        self.addImage(resp.image.middle)
      }
    }

    // --

    const {editorState} = this.state;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (<div>
      <div styleName="draft" className={className}>

        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />

        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />

        <div>

          <FileUpload options={options}>上传图片</FileUpload>

          <button onMouseDown={this.addVideo} style={{marginRight: 10}}>
            添加视频
          </button>

          {/*
          <button onMouseDown={this.addImage} style={{marginRight: 10}}>
            Add Image
          </button>

          */}
        </div>

        <Editor
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          blockStyleFn={getBlockStyle}
          placeholder="请输入正文1111..."
          ref="editor"
        />

      </div>
      <a href="javascript:void(0)" onClick={this.submitQuestion}>提交</a>

      {/*
      <iframe
      src="http://www.tudou.com/programs/view/html5embed.action?lcode=mpNUhSRktcI&autoPlay=false&playType=AUTO"
      width="100%"
      height="524px"
      frameborder="0"
      scrolling="no"
      ></iframe>
      */}

    </div>);
  }
}

MyEditor.propTypes = {
  accessToken: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    accessToken: getAccessToken(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

MyEditor = CSSModules(MyEditor, styles)

MyEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEditor)

export default MyEditor
