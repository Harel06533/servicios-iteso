// this file handles routing to different and base routes
"use strict";
const baseRouter = require("express").Router();

// routes
const loginRouter = require("./routes/login_routes");
const passRouter = require("./routes/pass_route");
const path = require("path");

// base router --> sends login page
baseRouter.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
});

// send login uri's to login router
baseRouter.use("/login", loginRouter);

// send pass recovery requests to passRouter
baseRouter.use("/password", passRouter);

module.exports = baseRouter;
