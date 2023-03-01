const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json("Twitter");
});

module.exports = router;
