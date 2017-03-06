import { GET_AUTH_SUCCESS, GET_AUTH_FAIL } from '../../actions/auth/actAuth.js';

const initialState = {
  auth: false // [false, 'fail', 'success']
}

export function reduceAuth(state = initialState, action) {

  switch (action.type) {

    case GET_AUTH_SUCCESS:
      return Object.assign({}, state, {
        auth: 'success'
      });

    case GET_AUTH_FAIL:
      return Object.assign({}, state, {
        auth: 'fail'
      });

    default:
      return {
        ...state
      };

  }

}
