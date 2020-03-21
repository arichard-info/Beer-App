const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const mail = require("./../handlers/mail");
const User = mongoose.model("User");

/**
 * Local strategy
 */

// authentication
exports.localAuth = (req, res, next) => {
  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.json({
        error: true,
        message: info && info.message ? info.message : ""
      });
    }
    res.cookie("auth", user._id, { httpOnly: true, signed: true });
    return res.json({
      error: false,
      message: "User logged in!",
      user: user.toObject()
    });
  })(req, res, next);
};

// forgot password
exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      error: true,
      message: "No account with that email exists"
    });
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetUrl = `${req.headers.origin}/login/reset/${user.resetPasswordToken}`;

  await mail.send({
    to: user.email,
    subject: "Password Reset",
    html: resetUrl
  });

  return res.json({
    error: false,
    message: "You have been emailed a password reset link."
  });
};

// check confirmed passwords
exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body["password-confirm"]) {
    next();
    return;
  }
  return res.json({ error: true, message: "Passwords do not match!" });
};

// update password
exports.updatePassword = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    return res.json({
      error: true,
      message: "Password reset is invalid or has expired"
    });
  }
  await user.setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updateUser = await user.save();
  req.body.email = updateUser.email;
  return next();
};

/**
 * Providers strategy
 */

// Google auth
exports.googleAuth = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email", "openid"]
    },
    (err, user, info) => {
      if (user && user.toComplete) {
        res.cookie("usr_complete", user.authProviderId, {
          httpOnly: true,
          signed: true
        });
        res.redirect(
          `http://localhost:3000/complete-profile?name=${user.name}&email=${user.email}`
        );
      } else if (user) {
        res.cookie("auth", user._id, { httpOnly: true, signed: true });
        res.redirect("http://localhost:3000");
      }
    }
  )(req, res, next);
};

// socket init
exports.addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// confirm provider auth
exports.confirmProviderAuth = async (req, res, next) => {
  console.log(req.signedCookies);
  if (!req.signedCookies || !req.signedCookies["usr_complete"]) {
    return res.status(401).end();
  }
  const providerId = req.signedCookies["usr_complete"];
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    authProviderId: providerId
  });

  await user.save();

  res.clearCookie("usr_complete");
  res.cookie("auth", user._id, { httpOnly: true, signed: true });
  return res.json({ user: user.toObject() });
};

/**
 * Cookie authentication strategy
 */

exports.authCookie = async (req, res, next) => {
  if (!req.signedCookies || !req.signedCookies.auth) {
    return res.status(401).end();
  }
  const userId = req.signedCookies.auth;

  return User.findById(userId, (userErr, user) => {
    if (userErr || !user) {
      return res.status(401).end();
    }
    // pass user details onto next middleware
    req.user = user;
    return next();
  });
};

exports.returnReqUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).end();
  }
  return res.json({
    error: false,
    message: "Valid cookie",
    user: { ...req.user.toObject() }
  });
};

exports.logout = (req, res, next) => {
  res.clearCookie("auth").end();
};
