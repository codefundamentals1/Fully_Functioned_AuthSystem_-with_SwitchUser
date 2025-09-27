const express = require("express")
const controller = require('../Controllers/Auth.Controller')
const router = express.Router();
router.post("/login" ,controller.login)

router.post("/register" , controller.register)
router.get("/logout" , controller.logout)

module.exports = router;