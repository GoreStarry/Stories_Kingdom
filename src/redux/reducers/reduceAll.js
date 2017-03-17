import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reduceUserInfo } from '../reducers/user/reduceUserInfo.js';
import { reduceStories } from '../reducers/stories/reduceStories.js';

export default combineReducers({
  user: reduceUserInfo,
  stories: reduceStories,
  routing: routerReducer
})
