// this route only sends unauthorized 401 status code page
"use strict";
import { Router } from "express";
import path from "path";
const router = Router();

router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/401.html"));
});
export default router;
