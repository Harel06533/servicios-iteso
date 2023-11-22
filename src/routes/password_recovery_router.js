// password recovery routes
"use strict";
import { Router } from "express";
import UserModel from "../models/userModel";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const router = Router();
const secretKey = process.env["SECRET_KEY"] || 0;

// sends password recovery modal (this is not safe)
router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/password-recovery.html"));
});

// '/' stands for '/password' where only checking will be done
router.post("/", async (req, res) => {
  try {
    const { studentEmail } = req.body;
    const doc = await UserModel.findOne({ student_email: studentEmail });
    if (!doc) throw new Error("User not found");
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(404).send("User was not found");
  }
});

export default router;
