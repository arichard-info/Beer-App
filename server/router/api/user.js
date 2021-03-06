const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const authController = require("./../../controllers/auth");
const drinkController = require("../../controllers/drink");
const userController = require("../../controllers/user");

router.post("/", authController.authCookie, catchErrors(userController.update));

router.get(
  "/drinks",
  authController.authCookie,
  catchErrors(drinkController.find)
);

router.get(
  "/drinks/fav",
  authController.authCookie,
  catchErrors(drinkController.findFav)
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

router.post(
  "/update",
  authController.authCookie,
  catchErrors(userController.update)
);

router.post(
  "/update-password",
  authController.authCookie,
  catchErrors(userController.updatePassword)
);

module.exports = router;
