import React, { PureComponent, PropTypes } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Motion, spring } from 'react-motion';
import styles from './MotionEditor.scss';

const onChangeFake = () => false

class MotionEditor extends PureComponent {

  state = {
    main_props: {
      id: 'main_Editor',
    },
  }

  render() {
    const {article_id, position, editorState} = this.props.page;
    return (
      <Motion key={ article_id } style={ { x: spring(position == 'next' && -innerWidth) } }>
        { style => {
            if (position) { // next & prev Editor (just for display)
              return <div className={ styles.box__editor } style={ { transform: `translate3d(${style.x}px, 0, 0)` } }>
                       <Editor editorState={ editorState } onChange={ onChangeFake } />
                     </div>
          
            } else { // main Editor can be realy edited
              return <div
                       { ...this.state.main_props}
                       className={ styles.box__editor }
                       style={ { transform: `translate3d(${style.x}px, 0, 0)` } }>
                       <Editor
                         ref={ this.props.setMainEditorRef }
                         editorState={ this.props.editorState }
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
