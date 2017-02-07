import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';


// import './draft.scss';
import styles from './draft.scss';

import KeyBindingMap from './draft-settings-map/KeyBindingMap.js';
import StyleMap from './draft-settings-map/StyleMap.js';
import BlockRenderMap from './draft-settings-map/BlockRenderMap.js';

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }
}

class DraftVertical extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => {


    };

  }

  handleKeyCommand = (command) => {
    if (command === 'myeditor-save') {
      console.log('save');
      console.log(this.testRef);
      this.testRef.focus();
      return 'handled'
    }
    return 'not-handled'
  };



  consoleEditorState = () => {
    console.log(this.state.editorState);
  }

  clInlineStyle = () => {
    console.log(this.state.editorState.getCurrentInlineStyle());
  }

  clBlockTree = () => {
    console.log(this.state.editorState.getBlockTree());
  }

  clClear = () => {
    console.clear();
  }

  clBlockKey = () => {
    const {editorState} = this.state;
    const currentSelection = editorState.getSelection();
    const startKey = currentSelection.getStartKey()
    console.log(startKey);
    return startKey;
  }

  selectionHeighlight = () => {
    let {editorState} = this.state;

    if (!isSelection(editorState)) {
      return;
    }

    editorState = RichUtils.toggleInlineStyle(editorState, 'HEIGH_LIGHT')

    this.setState({
      editorState
    })
  }


  render() {
    return (
      <div id="outer" className={ styles.test }>
        <Editor ref="test1" customStyleMap={ StyleMap } blockStyleFn={ myBlockStyleFn } keyBindingMap={ KeyBindingMap } handleKeyCommand={ this.handleKeyCommand }
          editorState={ this.state.editorState } onChange={ this.onChange } blockRenderMap={ BlockRenderMap } />
        <button onClick={ this.consoleEditorState }>Editor State</button>
        <button onClick={ this.clInlineStyle }>Inline Style</button>
        <button onClick={ this.clBlockTree }>Block Tree</button>
        <button onClick={ this.clBlockKey }>Block Key</button>
        <button onClick={ this.selectionHeighlight }>Heigh Light</button>
        <button onClick={ this.clClear }>clear console</button>
      </div>
      );
  }
}

export default DraftVertical;


const isSelection = (editorState) => {
  const selection = editorState.getSelection();
  const start = selection.getStartOffset();
  const end = selection.getEndOffset();
  console.log(start, end);
  return start !== end;
}
