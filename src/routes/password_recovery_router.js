// password recovery routes
"use strict";
import { Router } from "express";
import UserModel from "../../configs/dbconfig";
import path from "path";

const router = Router();

// sends password recovery modal (this is not safe)
router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/password-recovery.html"));
});

// '/' stands for '/password' where only checking will be done
router.post("/", async (req, res) => {
  const { studentEmail: email } = req.body;
  try {
    const doc = await UserModel.findOne({ studentEmail: email });
    if (!doc) throw new Error("User not found");
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(404).send("User was not found");
  }
});

export default router;
