import React, { Component } from 'react';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
const blockBreakoutPlugin = createBlockBreakoutPlugin({
  breakoutBlockType: 'commendBlock',
  breakoutBlocks: ['unstyled*', 'unstyled', 'commendBlock', 'div', 'commendBlock']
});
import Editor from 'draft-js-plugins-editor';

const plugins = [blockBreakoutPlugin]

import { EditorState, RichUtils, DefaultDraftBlockRenderMap, CompositeDecorator, Modifier, convertToRaw } from 'draft-js';
import HashtagSpan from './components/HashtagSpan.jsx';

import styles from './draft.scss';

import KeyBindingMap from './draft-settings-map/KeyBindingMap.js';
import StyleMap from './draft-settings-map/StyleMap.js';

import { BlockRenderMap, myBlockStyleFn } from './draft-settings-map/BlockRenderMap.js';

import TestDecoratorWapper from './components/TestDecoratorWapper.jsx';
import { findTestEntitiy } from './decorator-strategy/entityTestStrategy.js';
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(BlockRenderMap);

class DraftVertical extends Component {

  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: function(contentBlock, callback, contentState) {
          const text = contentBlock.getText();
          const hashReg = /\#[\w\u0590-\u05ff]+/g;
          let matchArr,
            start;
          while ((matchArr = hashReg.exec(text)) !== null) {
            start = matchArr.index;
            callback(start, start + matchArr[0].length);
          }
        },
        component: HashtagSpan,
      },
      {
        strategy: findTestEntitiy,
        component: TestDecoratorWapper
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };

    this.onChange = (editorState) => {

      this.setState({
        editorState
      });

    };

  }

  handleKeyCommand = (command) => {
    console.log('key in');
    if (command === 'myeditor-save') {
      console.log('save');
      this.consoleEditorState();
      return 'handled'
    } else if (command == 'commend-block') {
      console.log('commend');
      this.toggleComment();
      return 'handled'
    }
    return 'not-handled'
  };

  consoleEditorState = () => {
    console.log(this.state.editorState);
  }

  clRawContentState = () => {
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
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
    // console.log(startKey);
    return startKey;
  }

  selectionHeighlight = (e) => {
    e.preventDefault();

    let {editorState} = this.state;

    if (!isSelection(editorState)) {
      return;
    }

    editorState = RichUtils.toggleInlineStyle(editorState, 'HEIGH_LIGHT')

    this.setState({
      editorState
    })
  }

  toggleBlockType = (e) => {
    e.preventDefault();
    const {editorState} = this.state;

    const myEditorState = RichUtils.toggleBlockType(editorState, "superTitleBlock")

    this.setState({
      editorState: myEditorState
    });
  }

  toggleComment = () => {
    const {editorState} = this.state;
    const myEditorState = RichUtils.toggleBlockType(editorState, "commendBlock")
    this.setState({
      editorState: myEditorState
    });
  }

  clCurrentInlineStyle = (e) => {
    e.preventDefault();
    const {editorState} = this.state;
    console.log(editorState.getCurrentInlineStyle());
  }

  removeInlineStyle = (e) => {
    e.preventDefault();

    const {editorState} = this.state;

    const selection = editorState.getSelection();

    const nextContentState = Object.keys(StyleMap)
      .reduce((contentState, style) => {
        return Modifier.removeInlineStyle(contentState, selection, style);
      }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style')

    const currentStyle = editorState.getCurrentInlineStyle();

    // remove style not in StyleMap setting
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    this.onChange(nextEditorState)

  }

  createEntity = (e) => {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();


    const contentStateCreateEntity = contentState.createEntity(
      'TEST',
      'MUTABLE',
      {
        test_data: 'test'
      }
    );

    const entityKey = contentStateCreateEntity.getLastCreatedEntityKey();
    // console.log(convertToRaw(contentStateCreateEntity));
    // console.log(entityKey);
    const contentStateWithEntity = Modifier.applyEntity(
      contentState,
      selection,
      entityKey
    )
    // console.log(contentStateWithEntity);
    // console.log(convertToRaw(contentStateWithEntity));

    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    console.log(newEditorState);
    this.setState({
      editorState: newEditorState
    })
  }

  focus = () => {
    this.editor.focus();
  }



  render() {
    return (
      <div id="outer" className={ styles.test }>
        <Editor
          plugins={ plugins }
          ref={ editor => this.editor = editor }
          customStyleMap={ StyleMap }
          blockStyleFn={ myBlockStyleFn }
          keyBindingFn={ KeyBindingMap }
          handleKeyCommand={ this.handleKeyCommand }
          editorState={ this.state.editorState }
          onChange={ this.onChange }
          blockRenderMap={ extendedBlockRenderMap } />
        <div className="ctrlBar">
          <div>
            <button onClick={ this.consoleEditorState }>
              Editor State
            </button>
            <button onClick={ this.clRawContentState }>
              Raw Content State
            </button>
            <button onClick={ this.clInlineStyle }>
              Inline Style
            </button>
            <button onClick={ this.clBlockTree }>
              Block Tree
            </button>
            <button onClick={ this.clBlockKey }>
              Block Key
            </button>
            <button onClick={ this.clCurrentInlineStyle }>
              CurrentInline Style
            </button>
            <button onClick={ this.clClear }>
              clear console
            </button>
          </div>
          <div>
            <button onClick={ this.toggleBlockType }>
              Toggle Block Style
            </button>
            <button onClick={ this.selectionHeighlight }>
              Heigh Light
            </button>
            <button onClick={ this.removeInlineStyle }>
              Remove Styles
            </button>
            <button onClick={ this.createEntity }>
              Create Entitiy
            </button>
            <button onClick={ this.focus }>
              focus
            </button>
          </div>
        </div>
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
