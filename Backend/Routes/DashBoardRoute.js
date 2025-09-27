const express = require('express')
const dashboardController = require("../Controllers/DashBoard.controller");
const checkforRoute = require('../Middleware/Dashboard.middleware');
const router = express.Router();


router.get("/", checkforRoute ,dashboardController.index)

module.exports = router