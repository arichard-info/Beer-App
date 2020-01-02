const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");
const mail = require("./../handlers/mail");

exports.login = passport.authenticate("local");

exports.logout = (req, res) => {
  req.logout();
};

exports.forgot = async () => {
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

  const resetUrl = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;

  await mail.send({
    to: user.email,
    subject: "Password Reset",
    html: resetURL
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

exports.update = async (req, res) => {
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
  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updateUser = await user.save();
  await req.login(updateUser);
  res.json({ error: false, message: "User updated!" });
};
