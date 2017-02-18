const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../mongodb/model/user-settings');

authRouter.get('/auth', (req, res) => {
  res.send('success');
})

module.exports = authRouter;
