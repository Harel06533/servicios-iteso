// handles routing on home
"use strict";
import { validateAccessToken } from "../controllers/token";
import { Router } from "express";
import UserModel from "../models/userModel";

const router = Router();
const filterData = `
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
  const tokenInfo = validateAccessToken(token);
  if (!token || !tokenInfo.status) {
    res.status(401).redirect("/unauthorized");
  } else {
    const data = tokenInfo.data;
    req.headers["auth_data"] = data;
    next();
  }
});

// on "/profile", render home page on user profile
router.get("/profile", async (req, res) => {
  const { personal_email, student_email } = req.headers["auth_data"];
  const doc = await UserModel.findOne(
    {
      personal_email: personal_email,
      student_email: student_email,
    },
    filterData
  );
  const user = { ...doc._doc };
  res.render("profile", { user: user });
});

export default router;
