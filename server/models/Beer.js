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
  abv: {
    type: Number,
    required: "Please enter the ABV",
    min: 0,
    max: 100
  },
  tags: [String],
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
