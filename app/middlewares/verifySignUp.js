const db = require("../models");
const RANKS = db.RANKS;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRanksExisted = (req, res, next) => {
  if (req.body.ranks) {
    for (let i = 0; i < req.body.ranks.length; i++) {
      if (!RANKS.includes(req.body.ranks[i])) {
        res.status(400).send({
          message: `Failed! Rank ${req.body.ranks[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRanksExisted
};

module.exports = verifySignUp;
