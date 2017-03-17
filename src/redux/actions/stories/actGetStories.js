import axios from 'axios';

export const GET_STORIES_SUCCESS = 'GET_STORIES_SUCCESS';
export const GET_STORIES_FAIL = 'GET_STORIES_FAIL';

/**
 * get stories
 * 
 * @export
 * @returns async function to ReduxThunk
 */
export function actionGetStories() {
  return async function(dispatch, getState) {

    try {

      const {data} = await axios.get('/api/stories/');
      const {stories} = data;

      dispatch({
        type: GET_STORIES_SUCCESS,
        stories
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_STORIES_FAIL,
        error
      })
    }

  }
}
