// handles routing on home
"use strict";
import { validateAccessToken } from "../controllers/token";
import { Router } from "express";

const router = Router();

// middleware for checking the validity of an access token
router.use("/", (req, res, next) => {
  const { token } = req.query;
  if (!token || !validateAccessToken(token).status)
    res.status(401).redirect("/unauthorized");
  else next();
});

// on base, render home page (currently there is no auth, but the idea is to have one)
router.get("/", (_, res) => {
  res.render("home");
});

export default router;
