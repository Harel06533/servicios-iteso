"use strict";
import { Router } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import BachelorModel from "../models/bachelorModel";
import User from "../controllers/user";
import { generateAccessToken, validateAccessToken } from "../controllers/token";

const router = Router();

// encrypt password
async function encrypt(password) {
  const encrypted = await bcrypt.hash(password, 10);
  return encrypted;
}

// on post data - if the user exists then sends the data
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const doc = await UserModel.findOne(
      { student_email: email },
      "password full_name student_email"
    );
    const isPassword = await bcrypt.compare(password, doc.password);
    if (!isPassword) throw new Error("Password is not correct");
    const accessToken = generateAccessToken({
      full_name: doc.full_name,
      student_email: doc.student_email,
    });
    res.status(200).json({ access_token: accessToken });
  } catch (e) {
    console.error(e);
    res.status(404).send("User was not found");
  }
});

// post on change, changes a field (not the password)
router.post("/change", async (req, res) => {
  try {
    const change = req.body;
    const tokenData = validateAccessToken(req.headers["token"]).data;
    await UserModel.findOneAndUpdate(
      {
        full_name: tokenData.full_name,
        student_email: tokenData.student_email,
      },
      change
    );
    res.status(201).send("Data changed");
  } catch (e) {
    console.error(e.message);
    res.status(403).send("Unable to perform request");
  }
});

// register a user (This should not be used in the client end as user registration is not done on the website) this is for testing only
router.post("/register", async (req, res) => {
  const { password, bachelor, semester } = req.body;
  try {
    // get number of credits of the user and percent
    const { semesters, total_credits } = await BachelorModel.findOne(
      { name: bachelor },
      "semesters total_credits"
    );
    let userCurrentCredits = 0;
    const subjectsTaken = [];
    for (let sem = 0; sem < semester; sem++) {
      userCurrentCredits = semesters[sem].subjects.reduce(
        (acc, sub) => acc + sub.credits,
        0
      );
      subjectsTaken.push(...semesters[sem].subjects);
    }
    const userCreditsPercent = userCurrentCredits / total_credits;
    let grade =
      subjectsTaken.reduce((acc, sub) => acc + sub.grade, 0) /
      subjectsTaken.length;

    // create a user object for validation and data ordering
    const requestBody = {
      ...req.body,
      numberOfCredits: userCurrentCredits,
      creditsPercent: userCreditsPercent,
      subjectsTaken: subjectsTaken,
      grade: grade,
    };
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
