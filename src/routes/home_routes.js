"use strict";
const router = require("express").Router();
const dotenv = require("dotenv"); // for managing enviroment variables
dotenv.config();
const mongoose = require("mongoose");
const userSchema = require("../../configs/dbconfig");
const path = require("path");
const User = require("../controllers/User");

// on base, render home page (currently there is no auth, but the idea is to have one)
router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../views/home-container.html"));
});

module.exports = router;
