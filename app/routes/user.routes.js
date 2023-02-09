const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header( 
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", controller.allUsers);

  app.get("/api/all", controller.allAccess);

  app.get("/api/user", controller.userBoard);

  app.post("/api/user/addFriend", controller.addFriend);

  app.post("/api/user/delFriend", controller.delFriend);

  app.put("/api/user/updateRole", controller.updateRole);
};
