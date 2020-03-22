var express = require("express");
var router = express.Router();

const { catchErrors } = require("./../handlers/errorHandlers");

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
  userController.validateRegister,
  catchErrors(authController.confirmProviderAuth)
);

// Cookie verification
router.get(
  "/api/auth/auth-cookie",
  authController.authCookie,
  authController.returnReqUser
);

router.get("/api/auth/logout", authController.logout);

/**
 * User profile Routes
 */

router.post(
  "/api/user",
  authController.authCookie,
  catchErrors(userController.updateAccount)
);

router.get(
  "/api/user/drinks",
  authController.authCookie,
  catchErrors(drinkController.allDrinks)
);

router.get(
  "/api/user/drinks/day",
  authController.authCookie,
  catchErrors(drinkController.dayDrinks)
);

router.get(
  "/api/user/drinks/fav",
  authController.authCookie,
  catchErrors(drinkController.favDrinks)
);

router.get(
  "/api/user/drinks/count",
  authController.authCookie,
  catchErrors(drinkController.countDrinks)
);

/**
 * Beers routes
 */

router.get("/api/beers", catchErrors(beerController.getBeers));
router.get("/api/beers/:slug", catchErrors(beerController.getBeerFromSlug));

module.exports = router;
