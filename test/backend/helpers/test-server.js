process.env.NODE_ENV = 'test';

const express = require('express');

const app = express();

const port = 8080;

const apiRouter = require('../../../server/api/router-api.js').apiRouter;


app.use('/api', apiRouter);

app.listen(port);

module.exports = app;
