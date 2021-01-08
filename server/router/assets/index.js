const express = require("express");
const router = express.Router();
const path = require("path");

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/dist");

router.use(express.static(CLIENT_BUILD_PATH));
// All remaining requests return the React app, so it can handle routing.
router.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

module.exports = router;
