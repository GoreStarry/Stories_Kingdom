import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reduceUserInfo } from '../reducers/user/reduceUserInfo.js';
import { reduceStories } from '../reducers/stories/reduceStories.js';
import { reduceArticle } from '../reducers/articles/reduceArticles.js';

export default combineReducers({
  user: reduceUserInfo,
  stories: reduceStories,
  articles: reduceArticle,
  routing: routerReducer
})
