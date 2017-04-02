export const STROY_RECORD = 'stories_record';

export function getStoryEditRecordLocal(story_id) {
  const stories = localStorage.getItem(STROY_RECORD);
  try {
    return JSON.parse(stories[story_id]);
  } catch (error) {
    return false
  }
}
