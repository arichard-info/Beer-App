const mongoose = require("mongoose");
const Beer = mongoose.model("Beer");

exports.getBeers = async (req, res, next) => {
  const beers = await Beer.find();
  res.json(beers);
};

exports.getBeerFromSlug = async (req, res, next) => {
  const beer = await Beer.findOne({ slug: req.params.slug });
  res.json(beer);
};
