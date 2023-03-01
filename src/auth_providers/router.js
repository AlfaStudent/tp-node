const express = require("express");
const router = express.Router();

router.use("/google", require("./strategies/google"));

router.use("/twitter", require("./strategies/twitter"));

module.exports = router;
