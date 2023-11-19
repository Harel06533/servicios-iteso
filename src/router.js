// this file handles routing to different and base routes
"use strict";
const router = require("express").Router();
const path = require("path");

function sendLogin(_, res) {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
}

// base route, sends login page
router.get("/", (_, res) => sendLogin(_, res));
router.get("/login", (_, res) => sendLogin(_, res));

module.exports = router;
