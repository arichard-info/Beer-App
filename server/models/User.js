const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address",
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  authProviderId: {
    type: String,
  },
  authProvider: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  registerDate: Date,
});

userSchema.virtual("drinks", {
  ref: "Drink",
  localField: "_id",
  foreignField: "user",
});

function autopopulate(next) {
  this.populate("drinks");
  next();
}

userSchema.pre("find", autopopulate);
userSchema.pre("findOne", autopopulate);
userSchema.pre("findById", autopopulate);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
