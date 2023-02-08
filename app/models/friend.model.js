const mongoose = require("mongoose");

const Friend = mongoose.model(
  "Friend",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Friend;
