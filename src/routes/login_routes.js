"use strict";
const router = require("express").Router();
const path = require("path");
const dotenv = require("dotenv"); // for managing enviroment variables
const bcrypt = require("bcrypt"); // for encrypting passwords
dotenv.config();
const mongoose = require("mongoose");
const userSchema = require("../../configs/dbconfig");
const UserModel = mongoose.model("users", userSchema);
const User = require("../controllers/User");

// encrypt password
async function encrypt(password) {
  const encrypted = await bcrypt.hash(password, 10);
  return encrypted;
}

// send login form
router.get("/", (_, res) => {
  console.log(dataBaseUrl);
  res.sendFile(path.join(__dirname, "../../public/login-form.html"));
});

// TODO: setting a login auth
router.post("/user", (req, res) => {});

// register a user (This should not be used in the client end as user registration is not done on the website) this is for testing only
router.post("/register", async (req, res) => {
  const { firstNames, lastNames, password, personalEmail, bachelor, semester } =
    req.body;
  try {
    const newUser = new User(
      firstNames,
      lastNames,
      personalEmail,
      bachelor,
      semester
    );
    const userJson = newUser.toJSON();
    userJson["password"] = await encrypt(password);
    const modeled = UserModel(userJson);
    await modeled.save();
    res.status(201).send("User created");
  } catch (e) {
    console.log(e);
    res
      .status(403)
      .send("Error on creating user: " + e.errorMessage || e.message);
  }
});

module.exports = router;
