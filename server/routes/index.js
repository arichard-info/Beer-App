var express = require("express");
var router = express.Router();
const mainController = require("./../controllers/mainController");

/* GET default route. */
router.get("/", mainController.getDefault);

module.exports = router;
