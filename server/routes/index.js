var express = require("express");
var router = express.Router();

const { catchErrors } = require("./../handlers/errorHandlers");

const beerController = require("./../controllers/beerController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

// Beers
router.get("/api/beers", catchErrors(beerController.getBeers));
router.get("/api/beers/:slug", catchErrors(beerController.getBeerFromSlug));

// Login / Logout
router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);

// User
router.post(
  "/api/register",
  userController.validateRegister,
  userController.register,
  authController.login
);
router.post("/api/account", catchErrors(userController.updateAccount));
router.post("/api/account/forgot", catchErrors(authController.forgot));
router.post(
  "/api/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

module.exports = router;
