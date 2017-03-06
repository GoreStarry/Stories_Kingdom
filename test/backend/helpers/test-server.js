process.env.NODE_ENV = 'test';
const fs = require('fs');
const path = require('path')
const jwt_hash_key = fs.readFileSync(path.resolve(__dirname, '../../../server/api/user/hash.key'))

const express = require('express');

const app = express();

const port = 9000;

const apiRouter = require('../../../server/api/router-api.js').apiRouter;


app.set('jwt_hash_key', jwt_hash_key);

app.use('/api', apiRouter);

app.listen(port);

module.exports = app;
