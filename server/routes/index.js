var express = require("express");
var router = express.Router();

const { catchErrors } = require("./../handlers/errorHandlers");
const { verifyJWT } = require("./../handlers/jwt");

const beerController = require("./../controllers/beerController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

// Beers
router.get("/api/beers", catchErrors(beerController.getBeers));
router.get("/api/beers/:slug", catchErrors(beerController.getBeerFromSlug));

// Login
router.post("/api/login", authController.localAuth);
router.post(
  "/api/verify-token",
  authController.authJWT,
  authController.getUserByToken
);

// User
router.post(
  "/api/register",
  userController.validateRegister,
  userController.localRegister,
  authController.localAuth
);
router.post(
  "/api/account",
  authController.authJWT,
  catchErrors(userController.updateAccount)
);
router.post("/api/account/forgot", catchErrors(authController.forgot));
router.post(
  "/api/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.updatePassword),
  authController.localAuth
);

router.post(
  "/api/auth/complete-profile",
  verifyJWT,
  userController.validateRegister,
  catchErrors(authController.confirmProviderAuth)
);

router.get(
  "/api/auth/google",
  authController.addSocketIdtoSession,
  authController.googleAuth
);

router.get("/api/auth/google/callback", authController.googleAuth);

module.exports = router;
