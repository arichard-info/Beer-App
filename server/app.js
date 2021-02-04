const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const http = require("http");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const { onError, normalizePort } = require("./utils/expressServer");

dotenv.config();

require("./utils/mongoose/init");
require("./utils/passport/init");

const app = express();
const server = http.createServer(app);

app.set("io", socketio(server));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.locals.env = process.env;

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(require("./router"));

/**
 * Create HTTP server.
 */

const port = normalizePort("5000");
app.set("port", port);
server.listen(port);
server.on("error", onError(port));
