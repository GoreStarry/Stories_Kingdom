import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reduceUserInfo } from '../reducers/user-info/reduceUserInfo.js';
import { reduceAuth } from '../reducers/auth/reduceAuth.js';

export default combineReducers({
  auth: reduceAuth,
  user_info: reduceUserInfo,
  routing: routerReducer
})
