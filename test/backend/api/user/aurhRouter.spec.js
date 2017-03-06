import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../../../server/mongodb/model/user-settings.js';

import server from '../../helpers/test-server.js';
const assert = chai.assert;

chai.use(chaiHttp);

const api_url = {
  get_jwt_token: '/api/auth/'
}

describe('Auth API Test', () => {

  before((done) => { // empty the User database
    User.remove({}, (err) => {
      done();
    })
  })

  describe('None signin user', () => {

    it('first time sign up', (done) => {
      chai.request(server)
        .post(api_url['get_jwt_token'])
        .send({
          name: 'Gore'
        })
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "[success]");
          assert.propertyVal(res.body, 'message', 'Sign Up Success', "[message]");
          assert.isString(res.body.token, "[token exist]");
          assert.notProperty(res.body.user, '_id', "[should not have _id in user info]");
          done();
        })
    })

    it('second time login', (done) => {
      chai
        .request(server)
        .post(api_url['get_jwt_token'])
        .send({
          name: 'Gore'
        })
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "[status 200]");
          assert.deepPropertyVal(res, 'body.message', 'Login Success', "[Login Success]");
          assert.isString(res.body.token, "[token]");
          assert.notProperty(res.body.user, '_id', "[should not have _id in user info]");
          done();
        })
    })

  });
});
