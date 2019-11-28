const mongoose = require("mongoose");
const Beer = mongoose.model("Beer");

exports.getDefault = async (req, res, next) => {
  const beers = await Beer.find();
  console.log(beers);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify({ beers, test: "xDD" }));
};

exports.addEntry = async (req, res, next) => {
  await new Beer({
    name: "Leffe Ruby",
    description: "Je suis une belle description",
    tags: ["Fruit", "Belge"]
  }).save();
  const beers = await Beer.find();
  res.send(JSON.stringify({ beers }));
};
