const express = require("express");
const Draft = require("draft-js");

const Story = require("../../mongodb/model/story-schema.js");
const User = require("../../mongodb/model/user-settings.js");
const Article = require("../../mongodb/model/article-schema.js");

const storiesRouter = express.Router();

storiesRouter.get("/", async (req, res) => {
  const createBy = req.decoded.id;
  try {
    const stories = await Story.find({
      createBy,
      close: false
    }).sort("-updateTime");

    res.json({
      success: true,
      stories
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

storiesRouter.get("/backup/:story_id", async (req, res) => {
  const createBy = req.decoded.id;
  const belongStory = req.params.story_id;
  console.log(createBy, belongStory);
  try {
    const articles = await Article.find({
      belongStory,
      createBy,
      close: false
    });

    const planArticles = articles
      .map(article => {
        const planText = Draft.convertFromRaw(
          JSON.parse(article.draftContent)
        ).getPlainText();
        return planText;
      })
      .join("\n\n\n");

    res.set({ "Content-Disposition": 'attachment; filename="Test.txt"' });
    res.send(planArticles);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// 1.create a new story
// 2.add the new story to storyOrder
// 3.create first page of article for new story with chapter name
// 4.add new artilce to story articleOrder
storiesRouter.post("/", async (req, res) => {
  const { name, description } = req.body;
  const createBy = req.decoded.id;

  const newStory = new Story({
    name,
    description,
    createBy
  });

  try {
    // 1.create a new story
    const story = await newStory.save();

    // 2.add the new story to storyOrder
    const userWithNewOrder = await User.findByIdAndUpdate(
      createBy,
      {
        $push: {
          storiesOrder: {
            $each: [
              {
                id: story._id
              }
            ],
            $position: 0
          }
        }
      },
      {
        new: true
      }
    );

    // 3.create first page of article for new story with chapter name
    const DEFAULT_CHAPTER_NAME = "Fisrt Chapter";
    const newArticle = new Article({
      createBy,
      belongStory: story._id,
      chapterName: DEFAULT_CHAPTER_NAME
    });

    const init_article = await newArticle.save();

    // 4.add new artilce to story articleOrder
    const storyWithNewArticleOrder = await Story.findByIdAndUpdate(
      story._id,
      {
        $push: {
          articleOrder: {
            $each: [
              {
                id: init_article._id
              }
            ],
            $position: 0
          }
        }
      },
      {
        new: true
      }
    );

    const { storiesOrder } = userWithNewOrder;

    res.json({
      success: true,
      story: storyWithNewArticleOrder,
      storiesOrder
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// update story
storiesRouter.patch("/:id", async (req, res) => {
  const storyId = req.params.id;
  const createBy = req.decoded.id;

  try {
    const storyEdited = await Story.findOneAndUpdate(
      {
        _id: storyId,
        createBy
      },
      req.body,
      {
        new: true
      }
    );

    res.json({
      success: true,
      story: storyEdited
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// delete story
storiesRouter.delete("/:id", async (req, res) => {
  const storyId = req.params.id;
  const createBy = req.decoded.id;

  try {
    const deletedStory = await Story.findOneAndUpdate(
      {
        _id: storyId,
        createBy
      },
      {
        close: true
      }
    );

    const userWithNewOrder = await User.findByIdAndUpdate(
      createBy,
      {
        $pull: {
          storiesOrder: {
            id: storyId
          }
        }
      },
      {
        new: true
      }
    );

    const { storiesOrder } = userWithNewOrder;

    res.json({
      success: true,
      storiesOrder
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = storiesRouter;
