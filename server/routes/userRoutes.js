const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");
const bodyParser = require("body-parser");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");



const router = express.Router();

router.post("/", registerUser);

router.post("/login", authUser);


module.exports = router;