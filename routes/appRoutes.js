const Router = require("express");
const setCookie = require("../middlewares/setCookie");
const authRoutes = require("./authRoutes.js");

const router = new Router()

// router.use(setCookie)
router.use('/auth', authRoutes);

module.exports = router;

