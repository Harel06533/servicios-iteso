// here the jwt is created and validated
"use strict";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env["SECRET_KEY"];

// generates an access token
function generateAccessToken({ full_name, student_email }) {
  const payload = {
    full_name: full_name,
    student_email: student_email,
  };
  const options = { expiresIn: "5m" };
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
