const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

const { homeRender, logout } = require("../Controllers/homeController");

router.get("/", verifyUser, homeRender);

router.get("/logout", logout)

module.exports = router;
