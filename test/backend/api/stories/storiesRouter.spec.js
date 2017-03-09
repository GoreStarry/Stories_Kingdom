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

    let firstStoryId;

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
          assert.deepPropertyVal(res, 'body.data.storiesOrder.0.id', res.body.data.story._id, "story shoud save in the user story order");
          firstStoryId = res.body.data.story._id;
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

    let lastStoryId;

    it('make sure the last created story, was in the first of order', (done) => {
      chai
        .request(server)
        .post(api_url.getStories)
        .send({
          name: 'title1'
        })
        .set('x-access-token', token)
        .end((err, res) => {

          lastStoryId = res.body.data.story._id;

          assert.propertyVal(res, 'status', 200, "200 success");
          assert.deepPropertyVal(res, 'body.data.storiesOrder.0.id', lastStoryId, "last story id");
          done();
        })
    })

    it('update the description for story', (done) => {

      const description = 'I am the test description1';

      chai
        .request(server)
        .patch(api_url.getStories + lastStoryId)
        .send({
          description
        })
        .set('x-access-token', token)
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "[success]");
          assert.deepPropertyVal(res, 'body.data.description', description, "[get description]");
          done();
        })
    })

    it('update the story name for story', (done) => {

      const name = 'The New Title';

      chai
        .request(server)
        .patch(api_url.getStories + lastStoryId)
        .send({
          name
        })
        .set('x-access-token', token)
        .end((err, res) => {
          assert.deepPropertyVal(res, 'body.data.name', name, "[get description]");
          assert.propertyVal(res, 'status', 200, "[success]");
          done();
        })

    })

    it('delete stroy by close', (done) => {

      chai
        .request(server)
        .delete(api_url.getStories + lastStoryId)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "delete success");
          assert.deepPropertyVal(res, 'body.success', true, "[delete success]");
          assert.equal(res.body.data.storiesOrder.indexOf(lastStoryId), -1, "[not found deleted story in order]");
          assert.deepPropertyVal(res, 'body.data.storiesOrder.0.id', firstStoryId, "[first story id should keep in order]");
          done();
        })

    })

  });


});
