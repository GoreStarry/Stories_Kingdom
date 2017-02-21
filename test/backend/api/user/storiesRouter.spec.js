import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../../../server/mongodb/model/user-settings.js';

import server from '../../helpers/test-server.js';
const assert = chai.assert;

chai.use(chaiHttp);

const api_url = {
  get_jwt_token: '/api/auth/',
  getStories: '/api/stories/'
}

describe('Stories Page api Test', () => {

  describe('No jwt token test', () => {
    it('should be stop by verify token middleware', (done) => {
      chai
        .request(server)
        .get(api_url['getStories'])
        .end((err, res) => {
          assert.propertyVal(res, 'status', 401, "[status 401 for no token in body]");
          assert.deepPropertyVal(res, 'body.message', 'No token provided.', "[no token message]");
          done();
        })
    })
  });

  describe('have jwt token ', () => {
    let token;
    before((done) => {
      chai
        .request(server)
        .post(api_url.get_jwt_token)
        .send({
          name: 'stories_test'
        })
        .end((err, res) => {
          token = res.body.token;
          assert.isString(token, "token is string");
          done();
        })
    })

    it('get story list', (done) => {
      chai
        .request(server)
        .get(api_url.getStories)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "get story list successful");
          done();
        })
    })

  });


});
