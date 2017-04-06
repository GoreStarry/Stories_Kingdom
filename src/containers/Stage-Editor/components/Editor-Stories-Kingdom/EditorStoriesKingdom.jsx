import React, { PureComponent, PropTypes } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { TransitionMotion, spring } from 'react-motion';
import styles from './EditorStoriesKingdom.scss';


class EditorStoriesKingdom extends PureComponent {
  willLeave = () => {
    return {
      x: spring(-100),
      y: spring(0)
    };
  }
  willEnter = () => {
    return {
      x: spring(100),
      y: spring(0)
    };
  }


  render() {
    const {article_id, editorState, onChange, articleOrder} = this.props;

    return (
      <div className={ styles.EditorStoriesKingdom }>
        <TransitionMotion
          willEnter={ this.willEnter }
          willLeave={ this.willLeave }
          styles={ articleOrder.map(({id}) => ({
                     key: id,
                     style: {
                       x: 0,
                       y: 0
                     }
                   })) }>
          { interpolatedStyles => <div key={ article_id }>
                                    <Editor editorState={ editorState } onChange={ onChange } />
                                  </div> }
        </TransitionMotion>
      </div>
      );
  }
}

EditorStoriesKingdom.propTypes = {
  article_id: PropTypes.string,
  editorState: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  articleOrder: PropTypes.array.isRequired,
};

export default EditorStoriesKingdom;
