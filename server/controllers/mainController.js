const mongoose = require("mongoose");
const Beer = mongoose.model("Beer");

exports.getDefault = async (req, res, next) => {
  const beers = await Beer.find();
  console.log(beers);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify({ beers }));
};
