const { Router } = require("express");
const bodyParser = require("body-parser");
const { verifyAuth } = require("../middlewares");
const { verifyAccess } = require("../middlewares");
const verifyPermission = require("../middlewares/verifyPermission.js");
const { getUser, registerUser, loginUser, logoutUser, removeUser, editUser} = require("../controllers/userController")
const { verifyToken } = require("../utils/token");
const authRoutes = Router();

authRoutes.use(bodyParser.json())

authRoutes.get("/",verifyAccess , getUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/logout", logoutUser);
authRoutes.put("/edit", editUser);
authRoutes.delete("/remove",verifyAccess, verifyPermission, removeUser);

module.exports = authRoutes;
