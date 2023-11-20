// handles routing on home
"use strict";
import { Router } from "express";
import dotenv from "dotenv";
import UserModel from "../../configs/dbconfig";
import mongoose from "mongoose";
import path from "path";
import User from "../controllers/User";
dotenv.config();

const router = Router();

// on base, render home page (currently there is no auth, but the idea is to have one)
router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../views/home-container.html"));
});

export default router;
