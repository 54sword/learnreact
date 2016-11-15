import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import './Draft.css'
import './RichEditor.css'

// console.log(Entity)

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

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class DraftJS extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.submitQuestion = this.submitQuestion.bind(this)
    this.onChange = (editorState) => this.setState({editorState})
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.addImage = this._addImage.bind(this)
  }

  _addImage(e) {

    e.preventDefault();

    const {editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    /*

    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
     { url: '111' }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newEditorState = EditorState.set(
      editorState,
      {currentContent: entityKey}
    );

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      )
    })
    */

  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  submitQuestion() {

    const { editorState } = this.state
    const content = editorState.getCurrentContent()

    // console.log(editorState)

    /*
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
    */

    let options = {

      blockRenderers: {
        ATOMIC: (block) => {

          console.log(block.getData())

          /*
          let data = block.getData();
          if (data.foo === 'bar') {
            return '<div>' + escape(block.getText()) + '</div>';
          }
          */
        }
      }
    };

    console.log(convertToRaw(content))
    const html = stateToHTML(content, options)

    // console.log(convertToRaw(content))
    // const html = convertToHTML(options)(content)
    console.log(html)
    // console.log(content.toString())
    // console.log(convertToRaw(content))

  }

  render() {
    const { editorState } = this.state

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    
    return (<div><div styleName="draft" className={className}>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <Editor
                blockRendererFn={mediaBlockRenderer}
                editorState={editorState}
                onChange={this.onChange}
                blockStyleFn={getBlockStyle}
                placeholder="Enter some text..."
                ref="editor"
              />

            </div>
            <a href="javascript:void(0)" onClick={this.submitQuestion}>提交</a>
            <a href="javascript:void(0)" onClick={this.addImage}>添加一张图片</a>
            </div>)
  }

}

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
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }

  return media;
};

DraftJS = CSSModules(DraftJS, styles)

export default DraftJS
