const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

const { dictionaryRender, logout } = require("../Controllers/dictionaryController");

router.get("/dictionary", verifyUser, dictionaryRender);
router.get("/MVC")

router.get("/logout", logout)

module.exports = router;