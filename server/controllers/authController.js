const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const mail = require("./../handlers/mail");
const { signToken } = require("./../handlers/jwt");
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

    return res.json({
      error: false,
      message: "User logged in!",
      user: { ...user.toObject(), token: signToken(user._id) }
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
      const io = req.app.get("io");
      let data = { error: false };
      if (err || !user || !user.authProviderId) {
        data.error = true;
      } else {
        data.user = {
          ...user,
          toComplete: !user._id,
          token: user._id
            ? signToken(user._id)
            : signToken(user.authProviderId, "1h")
        };
      }

      io.in(req.session.socketId).emit("google", data);
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
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    authProviderId: req.body.authProviderId,
    authProvider: req.body.authProvider,
    picture: req.body.picture ? req.body.picture : ""
  });

  await user.save();
  return res.json({ user: { ...user.toObject(), token: signToken(user._id) } });
};

/**
 * JWT strategy
 */

// return user from request
exports.getUserByToken = (req, res) => {
  if (!req.user) {
    res.status(401).end();
  }
  return res.json({
    error: false,
    message: "Valid Token",
    user: { ...req.user.toObject() }
  });
};

// auth user with token
exports.authJWT = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err || !decoded.sub) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // pass user details onto next route
      req.user = user;
      return next();
    });
  });
};

/*
exports.bestDrinks = async (req, res, next) => {
  const drinks = await 
  return res.json(drinks)
}
*/
