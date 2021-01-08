const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: __dirname + "/../../.env" });

mongoose.connect(process.env.DATABASE || "27107", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const Beer = require("../../models/Beer");
const Drink = require("../../models/Drink");
const User = require("../../models/User");

const beers = JSON.parse(fs.readFileSync(__dirname + "/beers.json", "utf-8"));
const drinks = JSON.parse(fs.readFileSync(__dirname + "/drinks.json", "utf-8"));
const users = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf-8"));

async function deleteData() {
  try {
    await Beer.collection.drop();
    console.log("- Beers collection");
    await Drink.collection.drop();
    console.log("- Drinks collection");
    await User.collection.drop();
    console.log("- Users collection\n");
    console.log("✅  Data removed !\n");
    if (!process.argv.includes("--replace")) {
      console.log(
        "To load sample data, run: ",
        "\x1b[36m",
        "npm run mongo:sample",
        "\x1b[0m"
      );
    }
  } catch (e) {
    console.log("❌  Error :");
    console.log("\x1b[31m", e.errmsg || e, "\x1b[0m\n");
  }
}

async function loadData() {
  try {
    await Beer.insertMany(beers);
    console.log("- Beers collection");
    await Drink.insertMany(drinks);
    console.log("- Drinks collection");
    await User.insertMany(users);
    console.log("- Users collection\n");
    console.log("✅  Data loaded !\n");
    process.exit();
  } catch (e) {
    console.log(
      "❌  Error! If you are importing sample data, make sure to drop the existing database first with: ",
      "\x1b[36m",
      "npm run mongo:remove",
      "\x1b[0m"
    );
    console.log("\x1b[31m", e.errmsg || e, "\x1b[0m");
  }
}

async function handleSampleData() {
  if (process.argv.includes("--delete")) {
    console.log("Removing data...\n");
    await deleteData();
  } else if (process.argv.includes("--replace")) {
    console.log("1/2: Removing old data...\n");
    await deleteData();
    console.log("2/2: Loading sample data...\n");
    await loadData();
  } else {
    console.log("Loading sample data...\n");
    await loadData();
  }
  process.exit();
}

handleSampleData();
