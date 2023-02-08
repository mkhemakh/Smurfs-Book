const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.allUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    return res.send(users);
  });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.addFriend = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send("User not found");
    if (!user.friends.includes(req.body.friendname)) {
      user.friends.push(req.body.friendname);
    } else{
      return console.log("This User is already your friend.");
    }
    user.save((err, updatedUser) => {
      if (err) return res.status(500).send(err);
      return res.send(updatedUser);
    });
    });
  };

  exports.delFriend = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send("User not found");
  
      const friendIndex = user.friends.indexOf(req.body.friendname);
      if (friendIndex === -1) {
        return console.log("This user is not your friend.");
      } else {
        user.friends.splice(friendIndex, 1);
      }
  
      user.save((err, updatedUser) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedUser);
      });
    });
  };