import chai from 'chai';
import chaiHttp from 'chai-http';
import Story from '../../../../server/mongodb/model/story-schema.js';
import Article from '../../../../server/mongodb/model/article-schema.js';

import server from '../../helpers/test-server.js';
const assert = chai.assert;

chai.use(chaiHttp);

const api_url = {
  get_jwt_token: '/api/auth/',
  stories: '/api/stories/',
  article: '/api/article/'
}

import { List } from 'immutable';
import { convertToRaw, genKey, EditorState } from 'draft-js';
import { findIndex } from 'lodash';

describe('Article Router Api Test', () => {

  describe('No jwt token test', () => {
    it('should be stop by verify token middleware', (done) => {
      chai
        .request(server)
        .get(api_url['article'])
        .end((err, res) => {
          assert.propertyVal(res, 'status', 401, "[status 401 for no token in body]");
          assert.deepPropertyVal(res, 'body.message', 'No token provided.', "[no token message]");
          done();
        })
    })
  });

  describe('with jwt token ', () => {

    let token;
    let story_id;


    //async mocha test https://github.com/mochajs/mocha/issues/2407
    before(async() => {

      // empty the Article collection
      try {
        Article.remove({}, (err) => {
          console.log(err);
        })
      } catch (error) {
        console.log(error);
      }


      // get user token

      const auth_res = await chai
        .request(server)
        .post(api_url['get_jwt_token'])
        .send({
          name: 'article_test'
        })


      token = auth_res.body.token;

      // create a new story to test article
      const test_story_name = 'The story for test article';

      const story_res = await chai
        .request(server)
        .post(api_url['stories'])
        .send({
          name: test_story_name,
        })
        .set('x-access-token', token)
      assert.propertyVal(story_res, 'status', 200, "status 200 success")
      assert.deepPropertyVal(story_res, 'body.story.name', test_story_name, "create by right title");
      assert.deepPropertyVal(story_res, 'body.storiesOrder.0.id', story_res.body.story._id, "story shoud save in the user story order");
      story_id = story_res.body.story._id;

    })

    let article_id;

    it('create the first article in story with empty draft content', (done) => {
      const editorState = EditorState.createEmpty();
      const contentState = editorState.getCurrentContent();

      const rowDraftContent = convertToRaw(contentState);
      const draftContent = JSON.stringify(rowDraftContent);
      chai
        .request(server)
        .post(api_url['article'])
        .send({
          story_id,
          previousArticleIndex: -1, //first article index
          draftContent
        })
        .set('x-access-token', token)
        .end((err, res) => {
          const res_article_id = res.body.article._id;
          assert.propertyVal(res, 'status', 200, "status 200 success")
          assert.isString(res_article_id, "[created aricle id exist]");
          assert.deepPropertyVal(res.body.story, 'articleOrder.1.id', res_article_id, "[first order of article id is same as first create id ]")
          article_id = res_article_id
          done();
        })
    })


    it('update article with constentState, outline, articleAlign ', (done) => {

      const articleAlign = 'center';
      const draftContent = '';
      const outline = 'out line 測試';
      chai
        .request(server)
        .patch(api_url['article'] + article_id)
        .send({
          draftContent,
          articleAlign,
          outline
        })
        .set('x-access-token', token)
        .end((err, res) => {
          const {article} = res.body;
          assert.propertyVal(res, 'status', 200, "status 200 success")
          assert.propertyVal(article, 'draftContent', draftContent, "[ update draftContent  ]")
          assert.propertyVal(article, 'articleAlign', articleAlign, "[ update articleAlign  ]")
          assert.propertyVal(article, 'outline', outline, "[ update outline  ]")
          done();
        })

    })

    it('delete article', (done) => {
      chai
        .request(server)
        .delete(api_url['article'] + article_id)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.propertyVal(res, 'status', 200, "status 200 success")
          const {articleOrder} = res.body;
          const indexOfArticle = findIndex(articleOrder, {
            id: article_id
          })
          assert.equal(indexOfArticle, -1, "[should not find deleted article in articleOrder]");
          done();
        })
    })

  })


});
