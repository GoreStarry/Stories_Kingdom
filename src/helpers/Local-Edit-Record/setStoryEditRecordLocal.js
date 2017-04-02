import { STROY_RECORD } from './getStoryEditRecordLocal.jsx';

/**
 * @export
 * @param {String} story_id 
 * @param {Object} records 
 * @returns {boolean}
 */
export function setStoryEditRecordLocal(story_id, records) {
  const stories = JSON.parse(localStorage.getItem(STROY_RECORD));
  // keep the older setting and update news
  const newRecord = Object.assign({}, stories, {
    [story_id]: Object.assign({}, stories[story_id], records)
  })

  return localStorage.setItem(STROY_RECORD, JSON.stringify(newRecord)) || false;
}
