// this file handles routing to different and base routes
"use strict";
const baseRouter = require("express").Router();
const loginRouter = require("./routes/login_routes");
const path = require("path");

// base router
baseRouter.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
});

// send login and base uri to login router
baseRouter.use("/login", loginRouter);

module.exports = baseRouter;
