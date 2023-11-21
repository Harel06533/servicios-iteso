"use strict";

import { Router } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import path from "path";

const router = Router();

// middleware for ensuring that email exists (lame attempt of auth af)
router.use("/", (req, res, next) => {
  if (!req.query["email"]) {
    res.status(401).redirect("http://localhost:3000/unauthorized");
  } else {
    next();
  }
});

// on base, send password reset html
router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/password-reset.html"));
});

// post on base, this changes the password data
router.post("/", async (req, res) => {
  const email = req.query["email"];
  const password = await bcrypt.hash(req.body["password"], 10);
  const filter = { student_email: email };
  const update = { password: password };
  try {
    const doc = await UserModel.findOneAndUpdate(filter, update);
    console.log(doc);
    if (!doc) throw new Error("Operation unsuccesful");
    res.status(201).send("Password updated");
  } catch (e) {
    console.error(e);
    res.status(404).send("error on password");
  }
});

module.exports = router;
