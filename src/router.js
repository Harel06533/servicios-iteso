// this file handles routing to different and base routes
"use strict";
import { Router } from "express";
import path from "path";

// routes
import loginRouter from "./routes/login_routes";
import passRecoveryRouter from "./routes/password_recovery_router";
import passResetRouter from "./routes/password_reset_router";
import homeRouter from "./routes/home_routes";
import unauthRouter from "./routes/unauthorized_router";
const baseRouter = Router();

// base router --> sends login page
baseRouter.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
});

// login routes
baseRouter.use("/unauthorized", unauthRouter);
baseRouter.use("/login", loginRouter); // on login, route to loginRouter
baseRouter.use("/password", passRecoveryRouter); // on password recovery, route
baseRouter.use("/passres", passResetRouter); // on password reset, route
baseRouter.use("/home", homeRouter);

export default baseRouter;
