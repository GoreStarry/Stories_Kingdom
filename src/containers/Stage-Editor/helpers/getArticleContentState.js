import { getStoryEditRecordLocal } from '../../../helpers/Local-Edit-Record/getStoryEditRecordLocal';

/**
   * try to get contentState from localStorage or redux or just new one
   */
export const getArticleDraftContent = (story_id, article_id, articles) => {


  return getLocalDraftContent(story_id, article_id) || getReduxStoreDraftContent(story_id, article_id, articles)
}


function getLocalDraftContent(story_id, article_id) {
  try { // check localStorage exist cache contentState or not
    return contentState = getStoryEditRecordLocal(story_id).update_cache.find((cache) => {
      return cache.article_id === article_id;
    }).contentState;
  } catch (error) {
    return false
  }
}

function getReduxStoreDraftContent(story_id, article_id, articles) {
  const contentStateString = articles[story_id][article_id].draftContent;
  return contentStateString ? JSON.parse(contentStateString) : false;
}
