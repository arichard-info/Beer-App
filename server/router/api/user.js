const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const authController = require("./../../controllers/authController");
const drinkController = require("./../../controllers/drinkController");
const userController = require("./../../controllers/userController");

router.post(
  "/",
  authController.authCookie,
  catchErrors(userController.updateAccount)
);

router.get(
  "/drinks",
  authController.authCookie,
  catchErrors(drinkController.allDrinks)
);

router.get(
  "/drinks/day",
  authController.authCookie,
  catchErrors(drinkController.dayDrinks)
);

router.get(
  "/drinks/fav",
  authController.authCookie,
  catchErrors(drinkController.favDrinks)
);

router.get(
  "/drinks/count",
  authController.authCookie,
  catchErrors(drinkController.countDrinks)
);

module.exports = router;
