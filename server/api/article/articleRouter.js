const express = require('express');

const Story = require('../../mongodb/model/story-schema');
const Article = require('../../mongodb/model/article-schema.js');

const articleRouter = express.Router();

// get all 
articleRouter.get('/:story_id', async(req, res) => {
  const createBy = req.decoded.id;
  const belongStory = req.params.story_id;

  try {

    const articles = await Article.find({
      belongStory,
      createBy,
      close: false
    })

    res.json({
      success: true,
      articles
    })

  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

// create new article 
// and push new article id to articleOrder
// with right position
// 
// {story_id, previous_article_index} = req.body
articleRouter.post('/', async(req, res) => {
  const createBy = req.decoded.id;
  const belongStory = req.body.story_id;
  const {draftContent} = req.body;
  // const draftContent = JSON.stringify(req.body.draftContent);
  const previousArticleIndex = req.body.previousArticleIndex;
  const newArticle = new Article({
    createBy,
    belongStory,
    draftContent
  })

  try {
    const article = await newArticle.save();
    const article_id = article._id;

    const storyWithNewOrder = await Story.findByIdAndUpdate(belongStory, {
      $push: {
        articleOrder: {
          $each: [{
            id: article_id
          }],
          $position: previousArticleIndex + 1
        }
      }
    }, {
      new: true
    })

    const {articleOrder} = storyWithNewOrder;

    res.json({
      success: true,
      article_id,
      articleOrder
    })

  } catch (error) {
    console.log(error);
    res.send(err)
  }
})

// delete(close) article and remove article id in story order
// { targetId } = req.body;
articleRouter.delete('/:id', async(req, res) => {
  const createBy = req.decoded.id;
  const targetId = req.params.id;
  try {
    const deleteArticle = await Article.findByIdAndUpdate(targetId, {
      close: true
    })

    const storyWidhNewOrder = await Story.findByIdAndUpdate(createBy, {
      $pull: {
        articleOrder: {
          id: targetId
        }
      }
    }, {
      new: true
    })

    const {articleOrder} = storyWidhNewOrder;
    console.log(articleOrder);
    res.json({
      success: true,
      articleOrder,
    })

  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

// update draftContent or article display align
// {draftContent, articleAlign} = req.body;
articleRouter.patch('/:id', async(req, res) => {
  const createBy = req.decoded.id;
  const targetId = req.params.id;
  const {draftContent, articleAlign, outline} = req.body;

  try {

    const newArticle = await Article.findByIdAndUpdate(targetId, {
      draftContent,
      articleAlign,
      outline
    }, {
      new: true
    })

    res.json({
      success: true,
      article: newArticle
    })

  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

module.exports = articleRouter;
