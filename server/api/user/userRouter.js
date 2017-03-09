const express = require('express');
const mongoose = require('mongoose');
const User = require('../../mongodb/model/user-settings.js');


const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const createBy = req.decoded.id;
  try {

    const data = await User
      .findById(createBy)
      .select(['-_id', '-__v']);

    res.json({
      success: true,
      data
    })

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

})

// patch user, for now it's just for edit storiesOrder
userRouter.patch('/', async (req, res) => {
  const createBy = req.decoded.id;
  const {storiesOrder} = req.body;
  try {
    const newUser = await User.findByIdAndUpdate(createBy, {
      storiesOrder
    }, {
      new: true
    }).select('-_id');

    res.json({
      success: true,
      data: newUser
    })

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

module.exports = userRouter;
