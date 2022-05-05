const Router = require("express");
const authRoutes = new Router;
const userController = require("../controllers/userController.js");
const bodyParser = require("body-parser");

authRoutes.use(bodyParser.json())

authRoutes.get("/", userController.getUsers);
authRoutes.get("/:id", userController.getUser);
authRoutes.post("/register", userController.registerUser);
authRoutes.post("/login", userController.loginUser);
authRoutes.get("/logout", userController.logoutUser);
authRoutes.put("/edit", userController.editUser);
authRoutes.delete("/remove/:id", userController.removeUser);

module.exports = authRoutes;
