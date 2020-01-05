var express = require("express");
var router = express.Router();

const { catchErrors } = require("./../handlers/errorHandlers");
const { checkToken } = require("./../handlers/jwt");

const beerController = require("./../controllers/beerController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

// Beers
router.get("/api/beers", catchErrors(beerController.getBeers));
router.get("/api/beers/:slug", catchErrors(beerController.getBeerFromSlug));

// Login
router.post("/api/login", authController.login);
router.post("/api/verify-token", checkToken, authController.verifyToken);

// User
router.post(
  "/api/register",
  userController.validateRegister,
  userController.register,
  authController.login
);
router.post(
  "/api/account",
  checkToken,
  catchErrors(userController.updateAccount)
);
router.post("/api/account/forgot", catchErrors(authController.forgot));
router.post(
  "/api/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.updatePassword),
  authController.login
);

router.get(
  "/api/auth/google",
  authController.addSocketIdtoSession,
  authController.googleAuth
);

router.get(
  "/api/auth/google/callback",
  authController.googleAuth,
  authController.socketGoogleAuth
);

module.exports = router;
