import React, { PureComponent, PropTypes } from 'react';
import styles from './ArticleDetial.scss';

class ArticleDetial extends PureComponent {
  render() {
    const {page_index, content_updated, className} = this.props;
    return (
      <div className={ `flex--row ${className} ${styles.container}` }>
        <span className={ content_updated ? styles['update--already'] : styles['update--yet'] }></span>
        <span className={ styles.detail__page_num }>Page. { page_index + 1 }</span>
      </div>
      );
  }
}

ArticleDetial.propTypes = {
  page_index: PropTypes.number,
  content_updated: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export default ArticleDetial;
