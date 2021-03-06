const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const drinkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: "You must supply a user",
    },
    beer: {
      type: mongoose.Schema.ObjectId,
      ref: "Beer",
    },
    date: {
      type: Date,
      default: Date.now,
      required: "You must supply a date",
    },
    quantity: {
      type: Number,
      min: 0,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

function autopopulate(next) {
  this.populate("beer");
  next();
}

drinkSchema.pre("find", autopopulate);
drinkSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Drink", drinkSchema);
