import { GET_USER_INFO } from '../../actions/user-info/actUserInfo.js';

const initialState = {
  test: false
}

export function reduceUserInfo(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return Object.assign({}, state, {
        test: true
      })
  }
}
