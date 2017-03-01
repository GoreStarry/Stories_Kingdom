import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../../../server/mongodb/model/user-settings.js';

import server from '../../helpers/test-server.js';
const assert = chai.assert;

chai.use(chaiHttp);

const api_url = {
  get_jwt_token: '/api/auth/',
  user: '/api/user/'
}

describe('User API Test', () => {

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

  it('update stories order', (done) => {
    const ObjectID = require('mongodb').ObjectID;
    const O1 = new ObjectID();
    const O2 = new ObjectID();
    const newOrder = [O1.toString(), O2.toString()];
    chai
      .request(server)
      .patch(api_url['user'])
      .send({
        storiesOrder: newOrder
      })
      .set('x-access-token', token)
      .end((err, res) => {
        assert.deepEqual(res.body.data.storiesOrder, newOrder, "[same as new order]");
        done();
      })


  })
});
