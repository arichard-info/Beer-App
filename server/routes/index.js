var express = require("express");
var router = express.Router();

const { catchErrors } = require("./../handlers/errorHandlers");
const { verifyJWT } = require("./../handlers/jwt");

const beerController = require("./../controllers/beerController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const drinkController = require("./../controllers/drinkController");

/**
 * Authentication Routes
 */

// Local strategy
router.post("/api/auth/login", authController.localAuth);
router.post(
  "/api/auth/register",
  userController.validateRegister,
  userController.localRegister,
  authController.localAuth
);
router.post("/api/auth/forgot", catchErrors(authController.forgot));
router.post(
  "/api/auth/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.updatePassword),
  authController.localAuth
);

// Providers strategy
router.get(
  "/api/auth/google",
  authController.addSocketIdtoSession,
  authController.googleAuth
);
router.get("/api/auth/google/callback", authController.googleAuth);
router.post(
  "/api/auth/complete-profile",
  verifyJWT,
  userController.validateRegister,
  catchErrors(authController.confirmProviderAuth)
);

// Token verification
router.post(
  "/api/auth/verify-token",
  authController.authJWT,
  authController.getUserByToken
);

/**
 * User profile Routes
 */

router.post(
  "/api/user",
  authController.authJWT,
  catchErrors(userController.updateAccount)
);

router.get(
  "/api/user/drinks",
  authController.authJWT,
  catchErrors(drinkController.allDrinks)
);

router.get(
  "/api/user/drinks/day",
  authController.authJWT,
  catchErrors(drinkController.dayDrinks)
);

router.get(
  "/api/user/drinks/fav",
  authController.authJWT,
  catchErrors(drinkController.favDrinks)
);

router.get(
  "/api/user/drinks/count",
  authController.authJWT,
  catchErrors(drinkController.countDrinks)
);
/*
router.get(
  "/api/user/best-drinks",
  authController.authJWT,
  catchErrors(userController.bestDrinks)
);
*/

/**
 * Beers routes
 */

router.get("/api/beers", catchErrors(beerController.getBeers));
router.get("/api/beers/:slug", catchErrors(beerController.getBeerFromSlug));

module.exports = router;
