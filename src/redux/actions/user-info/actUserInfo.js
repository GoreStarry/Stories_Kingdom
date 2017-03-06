import axios from 'axios';

export const GET_USER_INFO = 'GET_USER_INFO';
export const SERVER_ERROR = 'SERVER_ERROR'

function getUserInfo(token) {
  return async function(dispatch, getState) {

    try {

      const {data} = await axios.get('/api/user/');

      dispatch({
        type: GET_USER_INFO,
        data
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
