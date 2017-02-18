const express = require('express');

const Story = require('../../mongodb/model/story-schema.js');
const UserSetting = require('../../mongodb/model/user-settings.js');

const storiesRouter = express.Router();

storiesRouter.get('/', (req, res) => {
  res.send('test success')
})

// async function checkStoriesOrderExist() {
//   const order = await UserSetting.find();
//   console.log(order);
//   return order;
// }

// create a new story
storiesRouter.post('/', (req, res) => {
  const name = req.body.name;
  const newStory = new Story({
    name
  })
  console.log();

  try {
    // const doc = await newStory.save();
  } catch (err) {
    console.log(err);
    res.send(err)
  }

  // newStory
  //   .save()
  //   .then((doc) => {
  //     res.json(doc)
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   })

})

// delete story
storiesRouter.delete('/:id', (req, res) => {

})

// update story
storiesRouter.patch('/:id', (req, res) => {

})


module.exports = storiesRouter;
