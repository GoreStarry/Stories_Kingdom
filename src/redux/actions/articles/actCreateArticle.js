import axios from 'axios';

export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLES_SUCCESS';
export const CREATE_ARTICLE_FAIL = 'CREATE_ARTICLES_FAIL';

export function actionCreateArticle(story_id, now_page_num) {
  return async function(dispatch, getState) {
    try {

      const {data} = axios.post(`/api/article/`, {
        story_id,
        now_page_num
      })

      const {artilce, story} = data;

      dispatch({
        type: CREATE_ARTICLE_SUCCESS,
        article,
        story
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_ARTICLE_FAIL
      })

    }
  }
}

