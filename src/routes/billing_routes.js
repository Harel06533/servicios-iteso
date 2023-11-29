// for router payment (now is very simple, but the idea is to make it more flexible)
"use strict";
import { Router } from "express";
import { validateAccessToken } from "../controllers/token";
import UserModel from "../models/userModel";
const router = Router();

// for now, it just removes all debt (this should not be the functionality of course)
router.put("/", async (req, res) => {
  let { amount } = req.body;
  const token = req.headers["token"];
  try {
    const { full_name, student_email } = validateAccessToken(token).data;
    const doc = await UserModel.findOne({
      full_name: full_name,
      student_email: student_email,
    });
    while (amount > 0) {
      if (amount - doc.debts[0].amount >= 0) {
        amount -= doc.debts[0].amount;
        doc.debts.splice(0, 1);
      } else {
        doc.debts[0].amount -= amount;
        break;
      }
    }
    await doc.save();
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.send(e.message);
  }
});

export default router;
