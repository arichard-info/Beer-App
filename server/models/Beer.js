const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a beer name!"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  photo: String
});

beerSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Beer", beerSchema);
