const express = require("express");
const router = express.Router();

// API Routes
router.use("/api/auth", require("./api/auth"));
router.use("/api/user", require("./api/user"));
router.use("/api/beers", require("./api/beer"));

if (process.env.NODE_ENV === "production") {
  router.use("*", require("./assets"));
}

module.exports = router;
