"use strict";
import { Router } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import BachelorModel from "../models/bachelorModel";
import User from "../controllers/user";
import { generateAccessToken } from "../controllers/token";

const router = Router();

// encrypt password
async function encrypt(password) {
  const encrypted = await bcrypt.hash(password, 10);
  return encrypted;
}

// on post data - if the user exists then redirects to home
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const doc = await UserModel.findOne({ student_email: email });
    const isPassword = await bcrypt.compare(password, doc.password);
    if (!isPassword) throw new Error("Password is not correct");
    const accessToken = generateAccessToken({
      personal_email: doc.personal_email,
      student_email: doc.student_email,
    });
    res.status(200).send(accessToken);
  } catch (e) {
    res.status(404).send("User was not found");
  }
});

// register a user (This should not be used in the client end as user registration is not done on the website) this is for testing only
router.post("/register", async (req, res) => {
  const { password, bachelor, semester } = req.body;
  try {
    // get number of credits of the user
    const studentBachelor = await BachelorModel.findOne({ name: bachelor });
    let userCurrentCredits = 0;
    for (let sem = 0; sem < semester; sem++) {
      userCurrentCredits += studentBachelor.semesters[sem].credits;
    }

    // create a user object for validation and data ordering
    const requestBody = { ...req.body, numberOfCredits: userCurrentCredits };
    const newUser = new User(requestBody);
    const userJson = newUser.toJSON();

    // set json password
    userJson["password"] = await encrypt(password);
    const modeled = UserModel(userJson);
    await modeled.save();
    res.status(201).send("User created");
  } catch (e) {
    console.error(e);
    res.status(403).send("Error on creating user: " + e.message);
  }
});

export default router;
