var express = require("express");
var router = express.Router();
const mainController = require("./../controllers/mainController");

/* GET default route. */
router.get("/api", mainController.getDefault);

router.get("/api/add", mainController.addEntry);

module.exports = router;
