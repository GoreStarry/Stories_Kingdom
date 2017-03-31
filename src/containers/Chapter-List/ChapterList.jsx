import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';


import ChapterCard from './components/Chapter-Card/ChapterCard.jsx';


// TODO: 編輯ChapterName 跟 Outline
// TODO: 進入最尾編輯頁
// TODO: 進入上次編輯頁
class ChapterList extends PureComponent {

  state = {
    editeStory: false
  }

  componentDidMount() {
    const {actions, stories} = this.props;
    // if not get stories from StoriesList
    if (!stories) {
      actions.getStories();
    }
    const story_id = this.props.match.params.story_id;
    actions.getArticles(story_id)
  }

  editChapter = (article_id, editState) => {
    const {actions} = this.props;
    actions.editArticle(article_id, editState)
  }

  render() {
    const {stories, articles} = this.props;
    const {story_id} = this.props.match.params;

    if (articles[story_id] && stories) {

      const {articleOrder} = stories[story_id];
      return (
        <div>
          <h1>Chapter List</h1>
          <span>{ story_id }</span>
          <List divided verticalAlign='middle'>
            { articles[story_id] && stories && articleOrder.map((article_detail) => {
                const article_id = article_detail.id;
                const article = articles[story_id][article_id];
                console.log(article);
                return (
                  <ChapterCard
                    key={ article_id }
                    article={ article }
                    editChapter={ this.editChapter } />
                )
              }) }
          </List>
        </div>
        );
    } else {
      return false
    }
  }
}

ChapterList.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  articles: PropTypes.object,
  stories: PropTypes.any, // False or Array stories data with id key
};

function mapStateToProps(state) {
  return {
    articles: state.articles,
    stories: state.stories.stories,
  }
}

import { actionGetArticles } from '../../redux/actions/articles/actGetArticles.js';
import { actionEditArticle } from '../../redux/actions/articles/actEditArticle.js';
import { actionGetStories } from '../../redux/actions/stories/actGetStories.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStories: () => dispatch(actionGetStories()),
      getArticles: story_id => dispatch(actionGetArticles(story_id)),
      editArticle: (article_id, editedState) => dispatch(actionEditArticle(article_id, editedState)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList);
