const mongoose = require("mongoose");
const Drink = mongoose.model("Drink");
const Beer = mongoose.model("Beer");

const all = async (req, res, next) => {
  const { user } = req;
  const drinks = await Drink.find({ user: user._id });
  return res.json(drinks);
};

const fav = async (req, res, next) => {
  const user = req.user;
  const favDrinks = await Drink.aggregate([
    {
      $match: {
        user: user._id,
      },
    },
    {
      $group: {
        _id: "$beer",
        quantity: { $sum: "$quantity" },
        times: { $sum: 1 },
      },
    },
    { $sort: { times: -1, quantity: -1 } },
    {
      $lookup: {
        from: "beers",
        localField: "_id",
        foreignField: "_id",
        as: "beer",
      },
    },
    {
      $unwind: "$beer",
    },
    { $limit: 4 },
  ]);
  return res.json(favDrinks);
};

const day = async (req, res, next) => {
  const user = req.user;
  const start = req.query.date ? new Date(req.query.date) : new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 1);
  const dayDrinks = await Drink.find({
    $and: [{ user: user._id }, { date: { $gte: start, $lt: end } }],
  });
  return res.json(dayDrinks);
};

const count = async (req, res, next) => {
  const user = req.user;
  const countDrinks = await Drink.aggregate([
    { $match: { user: user._id } },
    {
      $addFields: {
        stringDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$date",
            timezone: "Europe/Paris",
          },
        },
      },
    },
    {
      $group: {
        _id: "$stringDate",
        quantity: { $sum: "$quantity" },
        count: { $sum: 1 },
      },
    },
  ]);
  return res.json(countDrinks);
};

const add = async (req, res, next) => {
  const { beer, quantity, date } = req.body;

  let userBeer = beer;
  if (beer.provider === "user") {
    userBeer = await Beer.create(beer);
  }

  console.log(userBeer);

  const drink = await Drink.create({
    beer: userBeer._id,
    date,
    quantity,
    user: req.user._id,
  });

  res.json(drink);
  next();
};

module.exports = {
  all,
  fav,
  day,
  count,
  add,
};
