export const TURN_PAGE_BY_ARTICLE_ID = 'TURN_PAGE_BY_ARTICLE_ID';

export function actionTurnPageByArticleId(article_id, article_index) {
  return {
    type: TURN_PAGE_BY_ARTICLE_ID,
    article_id,
    article_index
  }
}
