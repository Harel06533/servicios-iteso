"use strict";
import BachelorModel from "../models/bachelorModel";
import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  try {
    const semester = Number(req.query);
    const doc = await BachelorModel.find({});
    if (semester) {
      res.send(doc[semester]);
    } else {
      res.send(doc);
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
  const bachelor = req.body;
  try {
    const modeled = BachelorModel(bachelor);
    await modeled.save();
    res.status(201).send("Bachelor created");
  } catch (e) {
    console.error(e);
  }
});

export default router;
