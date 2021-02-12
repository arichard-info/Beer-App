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
  catchErrors(drinkController.all)
);

router.get(
  "/drinks/day",
  authController.authCookie,
  catchErrors(drinkController.day)
);

router.get(
  "/drinks/fav",
  authController.authCookie,
  catchErrors(drinkController.fav)
);

router.get(
  "/drinks/count",
  authController.authCookie,
  catchErrors(drinkController.count)
);

router.post(
  "/drinks/add",
  authController.authCookie,
  catchErrors(drinkController.add)
);

module.exports = router;
