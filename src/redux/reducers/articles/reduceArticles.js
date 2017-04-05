import { GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL } from '../../actions/articles/actGetArticles';
import { EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_FAIL } from '../../actions/articles/actEditArticle';
import { CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL } from '../../actions/articles/actCreateArticle';

const initialState = {

};

export function reduceArticle(state = initialState, action) {

  switch (action.type) {

    case GET_ARTICLES_SUCCESS:
      const {articles} = action;
      // trans array to object with article id key
      const articleObj = articles.reduce((prev, article, index, articles) => {
        return Object.assign(prev, {
          [article._id]: article
        })
      }, {})

      return Object.assign({}, state, {
        [action.story_id]: articleObj
      })

    case EDIT_ARTICLE_SUCCESS:
      var {article} = action;

      return Object.assign({}, state, {
        [article.belongStory]: Object.assign({}, state[article.belongStory], {
          [article._id]: article
        })
      })

    case CREATE_ARTICLE_SUCCESS:
      var {article} = action;
      return Object.assign({}, state, {
        [article.belongStory]: Object.assign({}, state[article.belongStory], {
          [article._id]: article
        })
      })


    default:
      return state
  }

}
