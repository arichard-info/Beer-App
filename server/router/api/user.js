const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const authController = require("./../../controllers/authController");
const drinkController = require("./../../controllers/drinkController");
const userController = require("./../../controllers/userController");

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

module.exports = router;
