import { GET_USER_INFO } from '../../actions/user/actUserInfo.js';
import { GET_AUTH_FAIL, GET_AUTH_SUCCESS } from '../../actions/user/actAuth';
import { CREATE_STORY_SUCCESS } from '../../actions/stories/actCreateStory.js';
const initialState = {
  auth: false, // [false, 'fail', 'success']
  user_info: {
    name: false,
    storiesOlder: false
  }
}

export function reduceUserInfo(state = initialState, action) {

  switch (action.type) {


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

    case CREATE_STORY_SUCCESS:
      console.log('in userinfo');
      console.log(action);
      return Object.assign({}, state, {
      });

    default:
      return {
        ...state
      };

  }

}
