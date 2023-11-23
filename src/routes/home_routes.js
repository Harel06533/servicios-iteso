// handles routing on home
"use strict";
import { validateAccessToken } from "../controllers/token";
import { Router } from "express";
import path from "path";
import UserModel from "../models/userModel";

const router = Router();

const GET_FILTER = `
  first_names
  last_names
  full_name
  expedient
  verifier_digit
  personal_email
  student_email
  phone_number
  location
  bachelor
  semester
  num_of_credits
  credits_percent
  debts
`;

// middleware for checking the validity of an access token
router.use("/", (req, res, next) => {
  const { token } = req.query;
  if (!token || !validateAccessToken(token).status)
    res.status(401).redirect("/unauthorized");
  else next();
});

router.get("/", async (req, res) => {
  const { token } = req.query;
  try {
    const { data } = validateAccessToken(token);
    const doc = await UserModel.findOne(
      {
        student_email: data.student_email,
        personal_email: data.personal_email,
      },
      GET_FILTER
    );
    res.status(200).json({ user_data: doc });
  } catch (e) {
    console.error(e);
    res.send(e.message);
  }
});

// on "/home/page", render home page (currently there is no auth, but the idea is to have one)
router.get("/page", (_, res) => {
  res.sendFile(path.join(__dirname, "../../views/home.html"));
});

export default router;
