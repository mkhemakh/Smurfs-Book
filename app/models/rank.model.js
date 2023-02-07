const mongoose = require("mongoose");

const Rank = mongoose.model(
  "Rank",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Rank;
