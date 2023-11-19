// password recovery routes
"use strict";
const router = require("express").Router();
const dotenv = require("dotenv"); // for managing enviroment variables
const bcrypt = require("bcrypt"); // for encrypting passwords
const mongoose = require("mongoose");
const path = require("path");
dotenv.config();

// sends password recovery modal
router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/password-recovery.html"));
});

// '/' stands for '/password' where only checking will be done
// TODO: '/password' routes for password recovery authentication
router.post("/", (req, res) => {});

module.exports = router;
