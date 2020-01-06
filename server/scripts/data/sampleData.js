const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: __dirname + "/../../.env" });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const Beer = require("../../models/Beer");
const Drink = require("../../models/Drink");
const User = require("../../models/User");

const beers = JSON.parse(fs.readFileSync(__dirname + "/beers.json", "utf-8"));
const drinks = JSON.parse(fs.readFileSync(__dirname + "/drinks.json", "utf-8"));
const users = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf-8"));

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Beer.collection.drop();
  await Drink.collection.drop();
  await User.collection.drop();
  console.log(
    "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
  );
  process.exit();
}

async function loadData() {
  try {
    await Beer.insertMany(beers);
    await Drink.insertMany(drinks);
    await User.insertMany(users);
    console.log("👍👍👍👍👍👍👍👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
