import React, { PureComponent, PropTypes } from 'react';

class ArticleDetial extends PureComponent {
  render() {
    const {now_page_num, content_updated} = this.props;
    return (
      <div>
        <span>p.{ now_page_num }</span>
        <span>{ content_updated ? 'G' : 'R' }</span>
      </div>
      );
  }
}

ArticleDetial.propTypes = {
  now_page_num: PropTypes.number,
  content_updated: PropTypes.bool.isRequired,
};

export default ArticleDetial;
