import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

// import './draft.scss';
import styles from './draft.scss';

class DraftVertical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({
      editorState
    });
  }

  render() {
    return (
      <div id="outer" className={ styles.test }>
        <Editor className="Draft" editorState={ this.state.editorState } onChange={ this.onChange } />
      </div>
      );
  }
}

export default DraftVertical;
