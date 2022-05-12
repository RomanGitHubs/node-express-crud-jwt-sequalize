const Router = require("express");
const authRoutes = require("./authRoutes.js");

const router = new Router()

router.use('/auth', authRoutes);

module.exports = router;
