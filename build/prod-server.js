var config = require("../config");
if (!process.env.NODE_ENV)
  process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV);
var path = require("path");
var express = require("express");
var fs = require("fs");
var opn = require("opn");

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.build.port;

var app = express();
const jwt_hash_key = fs.readFileSync(
  path.resolve(__dirname, "..//server/api/user/hash.key")
);
app.set("jwt_hash_key", jwt_hash_key);

// add api router to dev server
const apiRouter = require("../server/api/router-api").apiRouter;
app.use("/api", apiRouter);

// handle fallback for HTML5 history API
app.use(require("connect-history-api-fallback")());

// serve pure static assets
var staticPath = path.posix.join(
  config.build.assetsPublicPath,
  config.build.assetsSubDirectory
);
app.use(
  staticPath,
  express.static(
    path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory)
  )
);

app.get(/^\//, function(req, res) {
  res.sendFile(config.build.index);
});

var uri = "http://localhost:" + port;

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  // opn(uri)
});
