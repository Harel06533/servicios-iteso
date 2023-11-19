"use strict";
const router = require("express").Router();
const dotenv = require("dotenv"); // for managing enviroment variables
const bcrypt = require("bcrypt"); // for encrypting passwords
dotenv.config();
const mongoose = require("mongoose");
const userSchema = require("../../configs/dbconfig");
const UserModel = mongoose.model("users", userSchema); // this is just for creations purposes
const User = require("../controllers/User");

// encrypt password
async function encrypt(password) {
  const encrypted = await bcrypt.hash(password, 10);
  return encrypted;
}

// on post data - if the user exists then redirects to home
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const doc = await UserModel.findOne({ studentEmail: email });
    const isPassword = await bcrypt.compare(password, doc.password);
    if (!isPassword) throw new Error("Password is not correct");
    else res.status(200).send("User found");
  } catch (e) {
    res.status(404).send("User was not found");
  }
});

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
