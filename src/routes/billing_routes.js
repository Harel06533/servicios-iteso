// for router payment (now is very simple, but the idea is to make it more flexible)
"use strict";
import { Router } from "express";
import { validateAccessToken } from "../controllers/token";
import UserModel from "../models/userModel";
const router = Router();

// for now, it just removes all debt (this should not be the functionality of course)
router.post("/", async (req, res) => {
  const payment = req.body;
  const token = req.headers["token"];
  try {
    if (payment instanceof Array === false)
      throw new Error("body must be an array");
    const { full_name, student_email } = validateAccessToken(token).data;
    await UserModel.findOneAndUpdate(
      { full_name: full_name, student_email: student_email },
      { debts: [] },
    );
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.send(e.message);
  }
});

export default router;
