const express = require("express");
const router = express.Router();

const { catchErrors } = require("./../../utils/errorHandlers");
const userController = require("./../../controllers/userController");
const authController = require("./../../controllers/authController");

// Local strategy
router.post("/login", authController.localAuth);
router.post(
  "/register",
  userController.validateRegister,
  userController.localRegister,
  authController.localAuth
);
router.post("/forgot", catchErrors(authController.forgot));
router.post(
  "/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.updatePassword),
  authController.localAuth
);

// Providers strategy
router.get(
  "/google",
  authController.addSocketIdtoSession,
  authController.googleAuth
);
router.get("/google/callback", authController.googleAuth);
router.post(
  "/complete-profile",
  userController.validateRegister,
  catchErrors(authController.confirmProviderAuth)
);

// Cookie verification
router.get(
  "/auth-cookie",
  authController.authCookie,
  authController.returnReqUser
);

router.get("/logout", authController.logout);

module.exports = router;
