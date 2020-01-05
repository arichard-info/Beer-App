var express = require("express");
var router = express.Router();

const { catchErrors } = require("./../handlers/errorHandlers");
const authCheck = require("./../handlers/authCheck");

const beerController = require("./../controllers/beerController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

// Beers
router.get("/api/beers", catchErrors(beerController.getBeers));
router.get("/api/beers/:slug", catchErrors(beerController.getBeerFromSlug));

// Login
router.post("/api/login", authController.login);
router.post("/api/verify-token", authCheck, authController.verifyToken);

// User
router.post(
  "/api/register",
  userController.validateRegister,
  userController.register,
  authController.login
);
router.post(
  "/api/account",
  authCheck,
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
/*
router.get('/api/auth/twitter', addSocketIdtoSession, twitterAuth)
router.get('/api/auth/facebook', addSocketIdtoSession, facebookAuth)
router.get('/api/auth/github', addSocketIdtoSession, githubAuth)
*/

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
router.get(
  "/api/auth/google/callback",
  authController.googleAuth,
  authController.google
);
/*
router.get('/api/auth/twitter/callback', authController.twitterAuth, authController.twitter)
router.get('/api/auth/facebook/callback', authController.facebookAuth, authController.facebook)
router.get('/api/auth/github/callback', authController.githubAuth, authController.github)
*/

module.exports = router;
