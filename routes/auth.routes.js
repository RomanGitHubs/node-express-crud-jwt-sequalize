const { Router } = require("express");
const userController = require("../controllers/userController.js");
const bodyParser = require("body-parser");
const { verifyAuth } = require("../middlewares");
const { verifyAccess } = require("../middlewares");
const { verifyPermission } = require("../middlewares");
const { getUser, registerUser, loginUser, logoutUser, removeUser} = require("../controllers/userController")
const authRoutes = Router();

authRoutes.use(bodyParser.json())

authRoutes.get("/", verifyAuth, getUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/logout", logoutUser);
authRoutes.delete("/remove", removeUser);

module.exports = authRoutes;





// authRoutes.get("/:id", userController.getUser);
// authRoutes.put("/edit", userController.editUser);
