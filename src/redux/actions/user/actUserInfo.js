import axios from 'axios';

export const GET_USER_INFO = 'GET_AUTH_SUCCESS';
export const SERVER_ERROR = 'SERVER_ERROR'

export function getUserInfo(token) {
  return async function(dispatch, getState) {

    try {

      const {data} = await axios.get('/api/user/');

      dispatch({
        type: GET_USER_INFO,
        token,
        user_info: data.user
      })

    } catch (error) {
      console.log(error);

      dispatch({
        type: SERVER_ERROR,
        error
      })

    }

  }
}
