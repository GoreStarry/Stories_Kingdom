import axios from 'axios';
import _flow from 'lodash/fp/flow';

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAIL = 'GET_AUTH_FAIL';


const getTokenAndSetToHeader = _flow([
  getTokenFormLocal,
  setAxiosAccessTokenHeader
])

const setTokenAndSetToHeader = _flow([
  saveTokenToLocal,
  setAxiosAccessTokenHeader
])


/**
 * try to get auth token form local or post to get one
 * 
 * @param {any} name 
 * @returns 
 */
export function actionGetAuth(name) {

  if (getTokenAndSetToHeader()) {

    return {
      type: GET_AUTH_SUCCESS,
    }

  } else {

    return async function(dispatch, getState) {

      try {
        console.log(name);
        const token = await axios.post('/api/auth/', {
          name
        })

        setTokenAndSetToHeader(token);

        dispatch({
          type: GET_AUTH_SUCCESS,
        })

      } catch (error) {
        console.log(error);

        dispatch({
          type: GET_AUTH_FAIL,
        })

      }

    }

  }


}


/**
 * not for the sure token will still saving in the local storage in the future
 * 
 * @returns {String} token
 */
function getTokenFormLocal() {
  return localStorage.getItem('auth_token');
}


/**
 * set token to local
 * 
 * @param {String} token 
 * @returns {String} token 
 */
function saveTokenToLocal(token) {
  localStorage.setItem('auth_token', token)
  return token;
}


/**
 * set axios default header x-access-token
 * 
 * @param {String} token 
 */
function setAxiosAccessTokenHeader(token) {
  axios.defaults.headers.common['x-access-token'] = token;
  return token;
}

