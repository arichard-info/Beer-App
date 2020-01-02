const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name !").notEmpty();
  req.checkBody("email", "That Email is not valid !").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Password Cannot be Blank !").notEmpty();
  req
    .checkBody("password-confirm", "Confirmed Password cannot be blank!")
    .notEmpty();
  req
    .checkBody("password-confirm", "Oops! Your passwords do not match")
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.json({
      error: true,
      messages: errors.map(err => err.msg)
    });
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.updateAccount = async () => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: "query" }
  );

  return res.json({
    error: false,
    message: "Updated User!"
  });
};
