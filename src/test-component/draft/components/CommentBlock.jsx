import React, { PureComponent, PropTypes } from 'react';
import style from './CommentBlock.scss';
class CommentBlock extends PureComponent {
  render() {
    return (
      <div className={ style.CommentBlock }>
        { this.props.children }
      </div>
      );
  }
}

export default CommentBlock;
