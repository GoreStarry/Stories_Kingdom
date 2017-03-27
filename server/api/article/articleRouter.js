const express = require('express');

const Story = require('../../mongodb/model/story-schema');
const Article = require('../../mongodb/model/article-schema.js');

const articleRouter = express.Router();

articleRouter.get('/', async(req, res) => {
  const createBy = req.decoded.id;

  try {

    const articles = await Article.find({
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
articleRouter.post('/', async(req, res) => {
  const createBy = req.decoded.id;
  const belongStory = req.body.story_id;
  const previousArticleIndex = req.body.previousArticleIndex;
  const newArticle = new Article({
    createBy,
    belongStory
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
    })
  } catch (error) {
    console.log(error);
    res.send(err)
  }
})

articleRouter.delete('/:id', async(req, res) => {
  const createBy = req.decoded.id;
  const targetId = req.params.id;
  try {

  } catch (error) {
    console.log(error);

  }
})

articleRouter.patch('/:id', async(req, res) => {
  const createBy = req.decoded.id;
  const targetId = req.params.id;
  try {

  } catch (error) {
    console.log(error);

  }
})
