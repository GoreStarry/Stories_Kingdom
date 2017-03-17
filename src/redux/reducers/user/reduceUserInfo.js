import { GET_USER_INFO } from '../../actions/user/actUserInfo.js';
import { GET_AUTH_FAIL, GET_AUTH_SUCCESS } from '../../actions/user/actAuth';

const initialState = {
  auth: false // [false, 'fail', 'success']
}

export function reduceUserInfo(state = initialState, action) {

  switch (action.type) {

    // TODO: 把資料結構轉成object給 order list 取

    case GET_AUTH_SUCCESS:
      const {token, user_info} = action;
      return Object.assign({}, state, {
        auth: 'success',
        token,
        user_info
      });

    case GET_AUTH_FAIL:
      return Object.assign({}, state, {
        auth: 'fail'
      });

    default:
      return {
        ...state
      };

  }

}
