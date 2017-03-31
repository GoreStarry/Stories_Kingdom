import axios from 'axios';

export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_FAIL = 'EDIT_ARTICLE_FAIL';



/**
 * edit articlex
 * 
 * @export 
 * @param {String} article_id
 * @param {Object} edited 
 * @returns async function to ReduxThunk
 */
export function actionEditArticle(article_id, editedState) {

  return async function(dispatch, getState) {
    try {
      const {data} = await axios.patch(`/api/article/${article_id}`, editedState);
      dispatch({
        type: EDIT_ARTICLE_SUCCESS,
        article: data.article,
      })
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_ARTICLE_FAIL
      })
    }
  }

}
