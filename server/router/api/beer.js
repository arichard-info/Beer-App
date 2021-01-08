const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const beerController = require("./../../controllers/beerController");

router.get("/", catchErrors(beerController.getBeers));
router.get("/:slug", catchErrors(beerController.getBeerFromSlug));

module.exports = router;
