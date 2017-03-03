const express = require('express');
const mongoose = require('mongoose');
const User = require('../../mongodb/model/user-settings.js');

const userRouter = express.Router();

userRouter.patch('/', async (req, res) => {
  const createBy = req.decoded.id;
  const {storiesOrder} = req.body;
  console.log(storiesOrder);
  console.log(typeof (storiesOrder));
  try {
    const newUser = await User.findByIdAndUpdate(createBy, {
      storiesOrder
    }, {
      new: true
    })

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
