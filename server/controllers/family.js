const mongoose = require("mongoose");
const Family = mongoose.model("Family");

const find = async (req, res, next) => {
  const families = await Family.find();
  res.json(families);
};

const findOne = async (req, res, next) => {
  const family = await Family.findOne({ slug: req.params.slug });
  res.json(family);
};

module.exports = {
  find,
  findOne,
};
