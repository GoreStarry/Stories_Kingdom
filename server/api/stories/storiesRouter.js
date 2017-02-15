const express = require('express');

const storiesRouter = express.Router();

storiesRouter.get('/test/', (req, res) => {
  res.send('test success')
})

module.exports = storiesRouter;
