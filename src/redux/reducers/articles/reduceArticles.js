import { GET_ARTICLES_SUCCESS } from '../../actions/articles/actGetArticles';


const initialState = {

};

export function reduceArticle(state = initialState, action) {

  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        [action.story_id]: action.articles
      })

    default:
      return state
  }

}
