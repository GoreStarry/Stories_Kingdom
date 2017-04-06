import React, { PureComponent, PropTypes } from 'react';

class ArticleDetial extends PureComponent {
  render() {
    const {page_index, content_updated} = this.props;
    return (
      <div>
        <span>p.{ page_index + 1 }</span>
        <span>{ content_updated ? 'G' : 'R' }</span>
      </div>
      );
  }
}

ArticleDetial.propTypes = {
  page_index: PropTypes.number,
  content_updated: PropTypes.bool.isRequired,
};

export default ArticleDetial;
