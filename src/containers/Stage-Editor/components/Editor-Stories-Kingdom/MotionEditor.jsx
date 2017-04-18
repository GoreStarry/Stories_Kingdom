import React, { PureComponent, PropTypes } from 'react';
import { Editor, EditorState, ContentBlock, convertFromRaw, RichUtils, DefaultDraftBlockRenderMap, genKey } from 'draft-js';
import { List } from 'immutable';
import { Motion, spring } from 'react-motion';
import styles from './MotionEditor.scss';

import { testKeyBindingFn } from './draft-settings-map/keyBindingMap.js';
import { blockRenderMap, blockStyleFn } from './draft-settings-map/blockRenderMap.js';
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const onChangeFake = () => false;

class MotionEditor extends PureComponent {

  state = {
    main_props: {
      id: 'main_Editor',
    },
  }

  toggleComment = () => {
    const {editorState, onChange} = this.props;
    const myEditorState = RichUtils.toggleBlockType(editorState, "commendBlock")
    onChange(myEditorState);
  }

  newBlock = () => {
    // fork by Shingo Sato's draft-js-block-breakout-plugin https://github.com/icelab/draft-js-block-breakout-plugin/issues

    const breakoutBlockType = 'unstyled';
    const {editorState, onChange} = this.props;
    const selection = editorState.getSelection()
    if (selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent()
      const currentBlock = contentState.getBlockForKey(selection.getEndKey())
      const emptyBlockKey = genKey()

      const emptyBlock = new ContentBlock({
        key: emptyBlockKey,
        text: '',
        type: breakoutBlockType,
        characterList: List(),
        depth: 0,
      })

      const blockMap = contentState.getBlockMap()
      const blocksBefore = blockMap.toSeq().takeUntil(function(v) {
        return v === currentBlock
      })
      const blocksAfter = blockMap.toSeq().skipUntil(function(v) {
        return v === currentBlock
      }).rest()
      let augmentedBlocks
      let focusKey
      // Choose which order to apply the augmented blocks in depending
      // on whether we’re at the start or the end
      augmentedBlocks = [
        [currentBlock.getKey(), currentBlock],
        [emptyBlockKey, emptyBlock],
      ]
      focusKey = emptyBlockKey;
      // Join back together with the current + new block
      const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap()
      const newContentState = contentState.merge({
        blockMap: newBlocks,
        selectionBefore: selection,
        selectionAfter: selection.merge({
          anchorKey: focusKey,
          anchorOffset: 0,
          focusKey: focusKey,
          focusOffset: 0,
          isBackward: false
        })
      })
      // Set the state
      onChange(EditorState.push(editorState, newContentState, 'split-block'))
      return 'handled'
    }
    return 'not-handled'
  }


  handleKeyCommand = (command) => {
    console.log('key in');
    switch (command) {

      case 'commend-block':
        console.log('commend');
        this.toggleComment();
        return 'handled'

      case 'new-block':
        console.log('new block');
        return this.newBlock();

      default:
        return 'not-handled'
    }
  };

  render() {
    const {article_id, position, editorState} = this.props.page;
    return (
      <Motion key={ article_id } style={ { x: spring(position == 'next' && -innerWidth) } }>
        { style => {
            if (position) { // next & prev Editor (just for display)
              return <div className={ styles.box__editor } style={ { transform: `translate3d(${style.x}px, 0, 0)` } }>
                       <Editor
                         blockRenderMap={ extendedBlockRenderMap }
                         blockStyleFn={ blockStyleFn }
                         editorState={ editorState }
                         onChange={ onChangeFake } />
                     </div>
          
            } else { // main Editor can be realy edited
              return <div
                       { ...this.state.main_props}
                       className={ styles.box__editor }
                       style={ { transform: `translate3d(${style.x}px, 0, 0)` } }>
                       <Editor
                         ref={ this.props.setMainEditorRef }
                         editorState={ this.props.editorState }
                         keyBindingFn={ testKeyBindingFn }
                         handleKeyCommand={ this.handleKeyCommand }
                         blockRenderMap={ extendedBlockRenderMap }
                         blockStyleFn={ blockStyleFn }
                         onChange={ this.props.onChange } />
                     </div>
            }
          
          } }
      </Motion>
      );
  }
}

MotionEditor.propTypes = {
  page: PropTypes.object.isRequired,
  editorState: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  setMainEditorRef: PropTypes.func.isRequired,
};

export default MotionEditor;
