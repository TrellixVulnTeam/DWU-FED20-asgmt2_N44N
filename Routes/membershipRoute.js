const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

const {upgradeRender, upgradeSubmit} = require("../Controllers/membershipController/upgradeController")
const {cancelRender, cancelSubmit} = require("../Controllers/membershipController/cancelController")

router.get("/upgrade", verifyUser, upgradeRender)
router.post("/upgrade", verifyUser, upgradeSubmit)

router.get("/cancel", verifyUser, cancelRender)
router.post("/cancel", verifyUser, cancelSubmit)

module.exports = router;