import axios from 'axios';

export const CHANGE_STORIES_ORDER_SUCCESS = 'CHANGE_STORIES_ORDER_SUCCESS';
export const CHANGE_STORIES_ORDER_FAIL = 'CHANGE_STORIES_ORDER_FAIL';

export function actChangeStoriesOrder(newOrder) {
  return async function (dispatch, getState) {
    try {
      const newUserInfo = await axios.patch('/api/user/', {
        storiesOrder: newOrder
      })

      dispatch({
        type: CHANGE_STORIES_ORDER_SUCCESS,
        storiesOrder: newOrder
      })
    } catch (error) {
      console.log(error);
    }
  }
}
