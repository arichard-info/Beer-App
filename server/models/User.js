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
    required: "Please Supply an email address"
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true
  },
  picture: {
    type: String,
    trim: true
  },
  googleId: {
    type: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

userSchema.statics.findOrCreate = function(user, done) {
  const newUser = new this(user);
  this.findOne({ email: user.email }, function(err, result) {
    //  console.log(result);
    if (!result) {
      newUser.save(done(err, newUser));
    } else {
      done(err, result);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
