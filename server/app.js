const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");

require("./handlers/passport");

const routes = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.locals.env = process.env;

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");
  app.use(express.static(CLIENT_BUILD_PATH));
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(request, response) {
    response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
  });
}

module.exports = app;
