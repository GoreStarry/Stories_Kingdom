import { CREATE_STORY_SUCCESS, CREATE_STORY_FAIL } from '../../actions/stories/actCreateStory';
import { GET_STORIES_SUCCESS, GET_STORIES_FAIL } from '../../actions/stories/actGetStories.js';

const initialState = {
  stories: false
}

export function reduceStories(state = initialState, action) {
  switch (action.type) {

    // TODO: 把資料結構轉成object給 order list 取
    case GET_STORIES_SUCCESS:
      const {stories} = action;

      const storiesObj = stories.reduce((prev, story, index, stories) => {
        return Object.assign(prev, {
          [story._id]: story
        })
      }, {})

      return Object.assign({}, state, {
        stories: storiesObj
      })

    case GET_STORIES_FAIL:
      return {
        ...state
      }

    case CREATE_STORY_SUCCESS:
      const {story} = action;

      return Object.assign({}, state, {
        stories: Object.assign({}, state.stories, {
          [story._id]: story
        })
      })

    case CREATE_STORY_FAIL:
      return {
        ...state
      }

    default:
      return {
        ...state
      };

  }
}
