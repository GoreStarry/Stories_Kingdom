import axios from 'axios';

export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAIL = 'GET_ARTICLES_FAIL';



/**
 * get articles by story id,
 * 
 * @export
 * @param {String} story_id 
 * @returns async function to ReduxThunk
 */
export function actionGetArticles(story_id) {
  return async function(dispatch, getState) {
    try {

      const {data} = await axios.get(`/api/article/${story_id}`)
      const {articles} = data;

      dispatch({
        type: GET_ARTICLES_SUCCESS,
        story_id,
        articles
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ARTICLES_FAIL,
      })
    }

  }
}
