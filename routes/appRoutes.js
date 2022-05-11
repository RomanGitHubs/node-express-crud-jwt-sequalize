const Router = require("express");
const setCookie = require("../middlewares/setCookie");
const authRoutes = require("./authRoutes.js");

const router = new Router()

router.use('/auth', authRoutes);
router.use(setCookie)

module.exports = router;

