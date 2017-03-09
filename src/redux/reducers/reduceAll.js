import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reduceUserInfo } from '../reducers/user/reduceUserInfo.js';

export default combineReducers({
  user: reduceUserInfo,
  routing: routerReducer
})
