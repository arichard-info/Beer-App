const mongoose = require("mongoose");
const User = mongoose.model("User");

const { body, sanitizeBody, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  sanitizeBody("name");
  body("name", "You must supply a name !").notEmpty();
  body("email", "That Email is not valid !").isEmail().normalizeEmail();

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
      messages: errors.map((err) => err.msg),
    });
  }
  next();
};

const register = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.json({
      error: true,
      messages: "Email already registered",
    });
  }
  const user = new User({ email: req.body.email, name: req.body.name });
  await User.register(user, req.body.password);
  next();
};

const updatePassword = async (req, res, next) => {
  const { user } = req;

  body("password", "Password Cannot be Blank !").notEmpty();
  body("password-confirm", "Confirmed Password cannot be blank!").notEmpty();
  body("password-confirm", "Oops! Your passwords do not match").equals(
    req.body.password
  );

  const errors = validationResult(req).array();
  if (errors && errors.length) {
    return res.json({
      error: {
        message:
          (errors[0] && errors[0].msg) ||
          "Erreur lors de la mise à jour de l'utilisateur",
        detail: errors,
      },
    });
  }

  await user.setPassword(req.body.password);
  const updateUser = await user.save();
  return res.json({
    error: false,
    user: updateUser.toObject(),
  });
};

const update = async (req, res, next) => {
  const { user } = req;

  if (req.body.name) {
    sanitizeBody("name");
    body("name", "Tu dois fournir un nom !").notEmpty();
    user.name = req.body.name;
  }

  if (req.body.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({
        error: {
          message: "Cette adresse email est déjà utilisée",
          detail: {},
        },
      });
    }
    body("email", "L'adresse email est invalide !").isEmail().normalizeEmail();
    user.email = req.body.email;
  }

  const errors = validationResult(req).array();
  if (errors && errors.length) {
    return res.json({
      error: {
        message:
          (errors[0] && errors[0].msg) ||
          "Erreur lors de la mise à jour de l'utilisateur",
        detail: errors,
      },
    });
  }

  const updateUser = await user.save();
  return res.json({
    error: false,
    user: updateUser,
  });
};

module.exports = {
  register,
  validate,
  update,
  updatePassword,
};
