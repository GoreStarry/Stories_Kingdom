import axios from 'axios';

export const DELETE_STORY_SUCCESS = 'DELETE_STORY_SUCCESS';
export const DELETE_STORY_FAIL = 'DELETE_STORY_FAIL';

/**
 * this action wii pass to user reducer just update storyOrder will not delete the stroy data from storise map
 * 
 * @export
 * @param {String} storyId 
 * @returns 
 */
export function actDeleteStory(storyId) {
  return async function(dispatch, getState) {
    try {
      const res = await axios.delete(`/api/stories/${storyId}`);
      const {storiesOrder} = res.data;

      dispatch({
        type: DELETE_STORY_SUCCESS,
        storiesOrder
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_STORY_FAIL,
        error
      })
    }

  }
}
