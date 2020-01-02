var express = require("express");
var router = express.Router();
const beerController = require("./../controllers/beerController");

router.get("/api/beers", beerController.getBeers);
router.get("/api/beers/:slug", beerController.getBeerFromSlug);

module.exports = router;
