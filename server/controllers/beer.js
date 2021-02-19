const mongoose = require("mongoose");
const Beer = mongoose.model("Beer");

const find = async (req, res, next) => {
  let query = {};

  // Pagination options
  const {
    query: { perPage = 10, page = 0, search = "" },
  } = req;
  const options = { skip: perPage * page, limit: perPage };

  // Search Query options
  if (search) query.name = new RegExp(search, "i");

  const beers = await Beer.find(query, {}, options);
  const totalCount = await Beer.count(query);

  res.json({ beers, totalCount });
};

const findOne = async (req, res, next) => {
  const beer = await Beer.findOne({ slug: req.params.slug });
  res.json(beer);
};

module.exports = {
  find,
  findOne,
};
