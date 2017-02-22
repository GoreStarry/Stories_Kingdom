import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../../../server/mongodb/model/user-settings.js';
import Story from '../../../../server/mongodb/model/story-schema.js';


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

  describe('with jwt token ', () => {

    let token;

    before((done) => {
      // empty the stories collection 
      Story.remove({}, (err) => {
        console.log(err);
      })

      // get token
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

    it('post a new stroy', (done) => {
      chai
        .request(server)
        .post(api_url.getStories)
        .send({
          name: 'title1'
        })
        .set('x-access-token', token)
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "200 success");
          assert.deepPropertyVal(res, 'body.data.story.name', 'title1', "create by right title");
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
          assert.deepPropertyVal(res, 'body.data.0.name', 'title1', "[first story with right title name]");
          done();
        })
    })

    it('make sure the last created story, was in the first of order', (done) => {
      chai
        .request(server)
        .post(api_url.getStories)
        .send({
          name: 'title1'
        })
        .set('x-access-token', token)
        .end((err, res) => {

          // console.log(res.body.data);
          const lastStoryId = res.body.data.story._id;

          assert.propertyVal(res, 'status', 200, "200 success");
          assert.deepPropertyVal(res, 'body.data.storiesOrder.0', lastStoryId, "last story id");
          done();
        })
    })

  });


});
