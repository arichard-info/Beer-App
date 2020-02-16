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

exports.dayDrinks = async (req, res, next) => {
  const user = req.user;
  const day = req.query.date ? new Date(req.query.date) : new Date();
  const start = new Date(day.setHours(00, 00, 00));
  const end = new Date(day.setHours(23, 59, 59));
  const dayDrinks = await Drink.find({
    $and: [{ user: user._id }, { date: { $gt: start, $lt: end } }]
  });
  return res.json(dayDrinks);
};

exports.countDrinks = async (req, res, next) => {
  const user = req.user;
  const countDrinks = await Drink.aggregate([
    { $match: { user: user._id } },
    {
      $addFields: {
        stringDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }
        }
      }
    },
    {
      $group: {
        _id: "$stringDate",
        quantity: { $sum: "$quantity" },
        count: { $sum: 1 }
      }
    }
  ]);
  return res.json(countDrinks);
};