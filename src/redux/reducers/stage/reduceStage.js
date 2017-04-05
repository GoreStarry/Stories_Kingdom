import { TURN_PAGE_BY_ARTICLE_ID } from '../../actions/stage/actTurnPageByArticleId.js';
import { CREATE_ARTICLE_SUCCESS } from '../../actions/articles/actCreateArticle.js';

const initialState = {
  page_order: 0,
  page_article_id: false
}

export function reduceStage(state = initialState, action) {

  switch (action.type) {

    case TURN_PAGE_BY_ARTICLE_ID:
      return Object.assign({}, state, {
        page_order: action.article_index,
        page_article_id: action.article_id,
      })

    case CREATE_ARTICLE_SUCCESS:
      var {_id} = action.article;
      return Object.assign({}, state, {
        page_order: action.page_num,
        page_article_id: _id
      })

    default:
      return state

  }

}
