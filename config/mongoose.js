const mongoose = require("mongoose");
require("../env.js");
mongoose.connect(`mongodb://localhost/${process.env.DB}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to data base"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
