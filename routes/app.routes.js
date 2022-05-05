const authRoutes = require("./auth.routes");
const Router = require("express");

const router = Router()

router.use('/auth', authRoutes)

module.exports = router;
