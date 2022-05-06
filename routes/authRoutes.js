const { Router } = require("express");
const bodyParser = require("body-parser");
const { verifyAuth } = require("../middlewares");
const { verifyAccess } = require("../middlewares");
const { verifyPermission } = require("../middlewares/verifyPermission.js");
const { getUser, registerUser, loginUser, logoutUser, removeUser, editUser} = require("../controllers/userController")
const {verifyToken} = require("../utils/token");
const authRoutes = Router();

authRoutes.use(bodyParser.json())

console.log(getUser)
console.log(registerUser)
console.log(loginUser)
console.log(logoutUser)
console.log(removeUser)
console.log(verifyAuth, '// verifyAuth')
console.log(verifyToken)
console.log(verifyPermission)


authRoutes.get("/", getUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/logout", logoutUser);
authRoutes.put("/edit", editUser);
authRoutes.delete("/remove", removeUser);




module.exports = authRoutes;
