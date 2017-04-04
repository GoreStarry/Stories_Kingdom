import React, { PureComponent, PropTypes } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import styles from './EditorStoriesKingdom.scss';

class EditorStoriesKingdom extends PureComponent {
  render() {
    return (
      <div className={ styles.EditorStoriesKingdom }>
        <Editor {...this.props}/>
      </div>
      );
  }
}

EditorStoriesKingdom.propTypes = {

};

export default EditorStoriesKingdom;
