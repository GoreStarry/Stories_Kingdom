const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const HASH_KEY = fs.readFileSync(path.resolve(__dirname, "./user/hash.key"));

mongoose.Promise = global.Promise;

const Database = process.env.NODE_ENV === "test" ? "sk_test" : "storis_kingdom";
mongoose.connect(`localhost:27017/${Database}`);

const authRouter = require("./user/authRouter.js");
const userRouter = require("./user/userRouter.js");
const storiesRouter = require("./stories/storiesRouter.js");
const articleRouter = require("./article/articleRouter.js");

const apiRouter = express.Router();

apiRouter.use(
  bodyParser.json({
    limit: "10mb"
  })
);
apiRouter.use(
  bodyParser.urlencoded({
    extended: true
  })
);
apiRouter.use(bodyParser.text());
apiRouter.use(
  bodyParser.json({
    type: "application/json"
  })
);

apiRouter.use(morgan("dev"));

apiRouter.use(function timeLog(req, res, next) {
  // console.log('get api request');
  // console.log(req.body);
  next();
});

apiRouter.use("/auth", authRouter);

apiRouter.use(verifyToken);

apiRouter.use("/user", userRouter);
apiRouter.use("/stories", storiesRouter);
apiRouter.use("/article", articleRouter);

module.exports = {
  apiRouter,
  verifyToken
};

function verifyToken(req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, HASH_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "No token provided."
    });
  }
}
