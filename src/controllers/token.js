// here the jwt is created and validated
"use strict";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env["SECRET_KEY"];

// generates an access token
function generateAccessToken({ personal_email, student_email }) {
  const payload = {
    personal_email: personal_email,
    student_email: student_email,
  };
  const options = { expiresIn: "1m" };
  return jwt.sign(payload, secret, options);
}

// validates the token recieved is functional
function validateAccessToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return { status: true, data: decoded };
  } catch (e) {
    return { status: false, data: null };
  }
}

export { generateAccessToken, validateAccessToken }; // exports data
