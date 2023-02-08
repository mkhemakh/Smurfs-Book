const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.rank = require("./rank.model");
//db.friends = require("./friend.model")

db.RANKS = ["user", "admin", "moderator"];

module.exports = db;