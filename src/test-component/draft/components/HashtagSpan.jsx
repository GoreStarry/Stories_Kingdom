import React, { Component } from 'react';
import styles from '../draft.scss';

class HashtagSpan extends Component {
  render() {
    return (
      <span className={ styles.box__hashtag }>
                    { this.props.children }
                  </span>
      );
  }
}

export default HashtagSpan;
