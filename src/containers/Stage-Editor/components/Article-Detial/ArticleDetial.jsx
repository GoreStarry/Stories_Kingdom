import React, { PureComponent, PropTypes } from 'react';

class ArticleDetial extends PureComponent {
  render() {
    const {now_page_num} = this.props;
    return (
      <div>
        <span>p.{ now_page_num }</span>
      </div>
      );
  }
}

ArticleDetial.propTypes = {
  now_page_num: PropTypes.number,
};

export default ArticleDetial;
