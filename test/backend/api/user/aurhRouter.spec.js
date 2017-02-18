import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../helpers/test-server.js';
// let should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('Auth test', () => {
  it('first test', (done) => {
    chai.request(server).get('/api/').end((err, res) => {
      // res.should.have.status(404);
      assert.ok(res, "[message]");
      done();
    })
  })
});
