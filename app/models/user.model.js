const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role : String,
    ranks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rank"
      }
    ]
  })
);

module.exports = User;
