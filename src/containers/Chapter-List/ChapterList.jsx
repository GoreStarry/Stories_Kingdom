import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

// TODO: fetch 拿所有該story的article
// TODO: 只取有chapter name的render機制
// TODO: 進入最尾編輯頁
// TODO: 進入上次編輯頁
class ChapterList extends PureComponent {

  componentDidMount() {
    const {actions} = this.props;
    const story_id = this.props.match.params.story_id;
    actions.getArticles(story_id)
  }

  render() {
    const {stories, articles} = this.props;
    const {story_id} = this.props.match.params;
    console.log(story_id);
    console.log(stories);
    const {articleOrder} = stories[story_id];
    console.log(articleOrder);
    return (
      <div>
        <h1>Chapter List</h1>
        <span>{ story_id }</span>
        <ul>
          { articleOrder.map((article_id) => {
              console.log(article_id);
              return (
                <div key={ article_id.id }>
                  <span>13</span>
                </div>
              )
            }) }
        </ul>
      </div>
      );
  }
}

ChapterList.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  articles: PropTypes.object,
  stories: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    articles: state.articles,
    stories: state.stories.stories,
  }
}

import { actionGetArticles } from '../../redux/actions/articles/actGetArticles.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getArticles: (story_id) => dispatch(actionGetArticles(story_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList);
