const mongoose = require("mongoose");
const Drink = mongoose.model("Drink");

exports.allDrinks = async (req, res, next) => {
  const { user } = req;
  const drinks = await Drink.find({ user: user._id });
  return res.json(drinks);
};

exports.favDrinks = async (req, res, next) => {
  const user = req.user;
  const favDrinks = await Drink.aggregate([
    {
      $match: {
        user: user._id
      }
    },
    {
      $group: {
        _id: "$beer",
        quantity: { $sum: "$quantity" },
        times: { $sum: 1 }
      }
    },
    { $sort: { times: -1, quantity: -1 } },
    {
      $lookup: {
        from: "beers",
        localField: "_id",
        foreignField: "_id",
        as: "beer"
      }
    },
    {
      $unwind: "$beer"
    },
    { $limit: 4 }
  ]);
  return res.json(favDrinks);
};
