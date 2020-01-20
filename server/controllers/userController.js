const mongoose = require("mongoose");
const User = mongoose.model("User");

const { body, sanitizeBody, validationResult } = require("express-validator");

exports.validateRegister = (req, res, next) => {
  sanitizeBody("name");
  body("name", "You must supply a name !").notEmpty();
  body("email", "That Email is not valid !")
    .isEmail()
    .normalizeEmail();

  if (!req.body.provider) {
    body("password", "Password Cannot be Blank !").notEmpty();
    body("password-confirm", "Confirmed Password cannot be blank!").notEmpty();
    body("password-confirm", "Oops! Your passwords do not match").equals(
      req.body.password
    );
  } else {
    body("providerId", "Invalid providerId").notEmpty();
  }

  const errors = validationResult(req).array();

  if (errors && errors.length) {
    return res.json({
      error: true,
      messages: errors.map(err => err.msg)
    });
  }
  next();
};

exports.localRegister = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.json({
      error: true,
      messages: "Email already registered"
    });
  }
  const user = new User({ email: req.body.email, name: req.body.name });
  await User.register(user, req.body.password);
  next();
};

exports.updateAccount = async (req, res, next) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.body.user_id },
    { $set: updates },
    { new: true, runValidators: true, context: "query" }
  );

  if (!user) {
    return res.json({
      error: true,
      message: "Error when updating user"
    });
  }

  return res.json({
    error: false,
    message: "Updated User!",
    user
  });
};
