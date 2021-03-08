const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

const { profileRender, logout } = require("../Controllers/profileController");

router.get("/profile", verifyUser, profileRender,);

router.get("/logout", logout)

module.exports = router;