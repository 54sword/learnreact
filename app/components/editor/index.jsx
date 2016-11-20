
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAccessToken } from '../../reducers/sign'

import { Editor, EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js'

import FileUpload from '../../components/file-upload'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import './Draft.css'
import './RichEditor.css'

import Device from '../../common/device'
import Embed from '../../components/embed'
import Iframe from '../../components/iframe'


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
    )
  }
}

const BLOCK_TYPES = [
  // {label: 'H1', style: 'header-one'},
  // {label: 'H2', style: 'header-two'},
  // {label: 'H3', style: 'header-three'},
  // {label: 'H4', style: 'header-four'},
  // {label: 'H5', style: 'header-five'},
  // {label: 'H6', style: 'header-six'},
  // {label: 'Title', style: 'header-five'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
]

const BlockStyleControls = (props) => {

  const { editorState } = props
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
  )
}


// -----

var INLINE_STYLES = [
  {label: '加粗', style: 'BOLD'},
  {label: '斜体', style: 'ITALIC'},
  {label: '下划线', style: 'UNDERLINE'}
  // {label: 'Monospace', style: 'CODE'}
]

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

const Controls = (props) => {

  const { editorState } = props
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">

      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.toggleBlockType}
          style={type.style}
        />
      )}

      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.toggleInlineStyle}
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
      media = <Iframe src={url} frameborder="0" border="0" width="auto" height="auto" position="" allowfullscreen></Iframe>
    } else {
      let url = "http://player.youku.com/player.php/sid/"+src+"/v.swf"
      media = <Embed src={url}></Embed>
    }
  } else if (type === 'tudou') {
    let url = "http://www.tudou.com/programs/view/html5embed.action?code="+src
    media = <Iframe src={url} allowtransparency="true" allowfullscreen="true" allowfullscreenInteractive="true" scrolling="no" border="0" frameborder="0" width="auto" height="auto" position=""></Iframe>
    // <iframe url={url} allowtransparency="true" allowfullscreen="true" allowfullscreenInteractive="true" scrolling="no" border="0" frameborder="0"></iframe>
  } else if (type === 'qq') {
    if (Device.isMobileDevice()) {
      let url = "http://v.qq.com/iframe/player.html?vid="+src+"&tiny=0&auto=0"
      media = <Iframe frameborder="0" src={url} width="auto" height="auto" position="" allowfullscreen></Iframe>
    } else {
      let url = "http://static.video.qq.com/TPout.swf?vid="+src+"&auto=0"
      media = <Embed src={url}></Embed>
    }
  }

  return media;
}

// ------------------------------------

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
  )
  return (
    <span {...props} style={style}>
      {props.children}
    </span>
  )
}

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
  }
])

// -----

class MyEditor extends React.Component {

  constructor(props) {
    super(props)

    const { syncContent, content, readOnly } = this.props

    this.state = {
      syncContent: syncContent || null, // 编辑器改变的时候，调给外部组件使用
      readOnly: readOnly || false,
      editorState: content
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)), decorator)
        : EditorState.createEmpty()
    }

    this.onChange = this._onChange.bind(this)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.addVideo = this._addVideo.bind(this)
    this.addImage = this._addImage.bind(this)
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
  }

  _onChange(editorState) {
    this.setState({ editorState })

    const { syncContent } = this.state

    if (syncContent) {
      const content = editorState.getCurrentContent()

      if (!content.hasText()) {
        syncContent(JSON.stringify({}), '')
        return
      }
      syncContent(JSON.stringify(convertToRaw(content)), '')
    }
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
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

  _addImage(url) {
    this._promptForMedia('image', url)
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

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {

    const { editorState, readOnly } = this.state
    const self = this

    let className = 'RichEditor-editor';

    if (readOnly) {
      return (<div className={className}>
        <Editor
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          blockStyleFn={getBlockStyle}
        readOnly/>
      </div>)
    }

    const options = {
      url: 'image',
      uploadSuccess: (resp) => {
        self.addImage(resp.image.middle)
      }
    }

    return(<div styleName="draft" className={className}>

            <div styleName="media-tools">
              <span>
                <FileUpload options={options}>上传图片</FileUpload>
              </span>
              <span>
                <button onClick={this.addVideo}>添加视频</button>
              </span>
            </div>

            <Controls
              editorState={editorState}
              toggleBlockType={this.toggleBlockType}
              toggleInlineStyle={this.toggleInlineStyle}
            />

            <Editor
              blockRendererFn={mediaBlockRenderer}
              editorState={editorState}
              blockStyleFn={getBlockStyle}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              placeholder="请输入正文"
              ref="editor"
            />
          </div>)
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
MyEditor = connect(mapStateToProps, mapDispatchToProps)(MyEditor)

export default MyEditor
