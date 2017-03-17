import axios from 'axios';

export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
export const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';


/**
 * creact new story
 * 
 * @export
 * @param {Object} {name, description} 
 * @returns 
 */
export function actionCreateNewStroy({name, description}) {

  return async function(dispatch, getState) {

    try {

      const res = await axios.post('/api/stories/', {
        name,
        description
      });

      console.log(res.data);
      const {story, storiesOrder} = res.data;

      dispatch({
        type: CREATE_STORY_SUCCESS,
        story,
        storiesOrder
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_STORY_FAIL,
      })
    }

  }
}
