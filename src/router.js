// this file handles routing to different and base routes
"use strict";
const baseRouter = require("express").Router();

// routes
const loginRouter = require("./routes/login_routes");
const passRecoveryRouter = require("./routes/password_recovery_router");
const passResetRouter = require("./routes/password_reset_router");
const homeRouter = require("./routes/home_routes");
const path = require("path");

// base router --> sends login page
baseRouter.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
});

// login routes
baseRouter.use("/login", loginRouter); // on login, route to loginRouter
baseRouter.use("/password", passRecoveryRouter); // on password recovery, route
baseRouter.use("/passres", passResetRouter); // on password reset, route
baseRouter.use("/home", homeRouter);

module.exports = baseRouter;
