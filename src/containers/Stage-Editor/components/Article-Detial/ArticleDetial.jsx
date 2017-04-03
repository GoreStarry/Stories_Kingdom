import React, { PureComponent, PropTypes } from 'react';

class ArticleDetial extends PureComponent {
  render() {
    return (
      <div>
        <span>p.</span>
      </div>
      );
  }
}

ArticleDetial.propTypes = {
  now_page: PropTypes.number,
};

export default ArticleDetial;
