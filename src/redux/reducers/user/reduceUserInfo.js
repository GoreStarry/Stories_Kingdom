import { GET_USER_INFO } from '../../actions/user/actUserInfo.js';
import { GET_AUTH_FAIL, GET_AUTH_SUCCESS } from '../../actions/user/actAuth';
import { CHANGE_STORIES_ORDER_SUCCESS, CHANGE_STORIES_ORDER_FAIL } from '../../actions/user/actChangeStoriesOrder.js';
import { CREATE_STORY_SUCCESS } from '../../actions/stories/actCreateStory.js';
const initialState = {
  auth: false, // [false, 'fail', 'success']
  name: false,
  storiesOlder: false
}

export function reduceUserInfo(state = initialState, action) {

  switch (action.type) {


    case GET_AUTH_SUCCESS:
      var {token, name, storiesOrder} = action;

      return Object.assign({}, state, {
        auth: 'success',
        token,
        name,
        storiesOrder
      });

    case GET_AUTH_FAIL:
      return Object.assign({}, state, {
        auth: 'fail'
      });

    case CREATE_STORY_SUCCESS:
      return Object.assign({}, state, {

      });

    case CHANGE_STORIES_ORDER_SUCCESS:
      var {storiesOrder} = action;
      return Object.assign({}, state, {
        storiesOrder
      })


    default:
      return {
        ...state
      };

  }

}
