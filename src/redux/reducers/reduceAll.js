import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reduceUserInfo from '../reducers/user-info/reduceUserInfo.js';

export default combineReducers({
  user_info: reduceUserInfo,
  routing: routerReducer
})
