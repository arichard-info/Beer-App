const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const familyController = require("./../../controllers/family");

router.get("/", catchErrors(familyController.find));
router.get("/:slug", catchErrors(familyController.findOne));

module.exports = router;
