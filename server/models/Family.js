const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a family name!",
  },
  slug: String,
  color: String,
  description: String,
});

familySchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Family", familySchema);
