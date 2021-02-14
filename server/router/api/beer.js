const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const beerController = require("./../../controllers/beerController");

router.get("/", catchErrors(beerController.find));
router.get("/:slug", catchErrors(beerController.findOne));

module.exports = router;
