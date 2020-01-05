const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const mail = require("./../handlers/mail");
const { signToken } = require("./../handlers/jwt");
const User = mongoose.model("User");

exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.json({
        error: true,
        message: info && info.message ? info.message : ""
      });
    }
    const token = signToken(user._id);
    return res.json({
      error: false,
      message: "User logged in!",
      token,
      user: { email: user.email }
    });
  })(req, res, next);
};

exports.verifyToken = (req, res) => {
  if (!req.user) {
    res.status(401).end();
  }
  return res.json({
    error: false,
    message: "Valid Token",
    user: req.user
  });
};

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

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body["password-confirm"]) {
    next();
    return;
  }
  return res.json({ error: true, message: "Passwords do not match!" });
};

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

exports.addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email", "openid"]
});

exports.socketGoogleAuth = (req, res) => {
  const io = req.app.get("io");
  const { user } = req;
  io.in(req.session.socketId).emit("google", user);
};

/*
exports.twitterAuth = passport.authenticate('twitter')
exports.facebookAuth = passport.authenticate('facebook')
exports.githubAuth = passport.authenticate('github')
*/

/*
exports.twitter = (req, res) => {
  const io = req.app.get("io");
  io.in(req.session.socketId).emit("twitter", req.user);
};

exports.facebook = (req, res) => {
  const io = req.app.get("io");
  const { givenName, familyName } = req.user.name;
  io.in(req.session.socketId).emit("facebook", req.user);
};

exports.github = (req, res) => {
  const io = req.app.get("io");
  io.in(req.session.socketId).emit("github", req.user);
};
*/
