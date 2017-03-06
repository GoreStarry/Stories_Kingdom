import axios from 'axios';

/**
 * this helper is just for localhost dev version to make sure token is always on the localStorage
 * 
 * @export 
 * @param {String} username 
 */
function checkAuth(user_name) {

  return getTokenFormLocal() || fetchTheToken(user_name);

}


/**
 * not for the sure token will still saving in the local storage in the future
 * 
 * @returns {String} token
 */
function getTokenFormLocal() {
  return localStorage.getItem('auth_token');
}

function setTokenToLocal(token) {
  localStorage.setItem('auth_token', token)
  return token;
}

async function fetchTheToken(name) {
  let token;
  await axios.post('/api/auth/', {
    name
  }).then((res) => {
    token = res.body.token;

    if (token) {
      console.log(token);
      return setTokenToLocal(token)
    } else {
      token = false;
    }

  })
  return token;
}

export default {
  checkAuth,
  fetchTheToken // export for unit test
}
