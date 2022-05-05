const setCookie = require("../middlewares");
const { authRoutes } = require("./auth.routes");
const Router = require("express");

const router = Router()

router.use('/auth', authRoutes).use(setCookie)

module.exports = router;

