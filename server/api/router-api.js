const express = require('express');
const bodyPaser = require('body-parser');
const storiesRouter = require('./stories/storiesRouter.js');

const apiRouter = express.Router();

apiRouter.use(bodyPaser.json({
  limit: '10mb'
}));

apiRouter.use(function timeLog(req, res, next) {
  console.log('get api request');
  console.log(req.body);
  next();
});

apiRouter.use('/stories', storiesRouter);

module.exports = apiRouter;
