const express = require('express');

const Story = require('../../mongodb/model/story-schema.js');
const User = require('../../mongodb/model/user-settings.js');

const storiesRouter = express.Router();

storiesRouter.get('/', async (req, res) => {
  const createBy = req.decoded.id;
  console.log(createBy);
  try {

    const stories = await Story
      .find({
        createBy,
        close: false
      })
      .sort('-updateTime')

    res.json({
      success: true,
      data: stories
    })

  } catch (error) {
    console.log(error);
    res.send(error)
  }

})

// create a new story
storiesRouter.post('/', async (req, res) => {

  const name = req.body.name;
  const createBy = req.decoded.id;

  const newStory = new Story({
    name,
    createBy
  })

  try {

    const story = await newStory.save();
    const userWidthNewOrder = await User.findByIdAndUpdate(createBy, {
      $push: {
        storiesOrder: {
          $each: [story._id],
          $position: 0
        }
      }
    }, {
      new: true
    })

    const {storiesOrder} = userWidthNewOrder;

    res.json({
      success: true,
      data: {
        story,
        storiesOrder
      }
    });

  } catch (err) {
    console.log(err);
    res.send(err)
  }

})

// update story
storiesRouter.patch('/:id', async (req, res) => {
  const storyId = req.params.id;
  const createBy = req.decoded.id;

  try {

    const storyEdited = await Story.findOneAndUpdate({
      _id: storyId,
      createBy
    }, req.body, {
      new: true
    })

    res.json({
      success: true,
      data: storyEdited
    })


  } catch (error) {
    console.log(error);
  }

})

// delete story
storiesRouter.delete('/:id', async (req, res) => {
  const storyId = req.params.id;
  const createBy = req.decoded.id;

  try {

    const deletedStory = await Story.findOneAndUpdate({
      _id: storyId,
      createBy
    }, {
      close: true
    })

    const userWidthNewOrder = await User.findOneAndUpdate({
      _id: createBy,
    }, {
      $pull: {
        storiesOrder: storyId
      }
    }, {
      new: true
    })

    const {storiesOrder} = userWidthNewOrder;

    res.json({
      success: true,
      data: {
        storiesOrder
      }
    })

  } catch (error) {
    console.log(error);
  }
})



module.exports = storiesRouter;
