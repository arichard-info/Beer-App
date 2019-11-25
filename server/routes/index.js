var express = require("express");
var router = express.Router();
const mainController = require("./../controllers/mainController");

/* GET default route. */
router.get("/api", mainController.getDefault);

module.exports = router;
