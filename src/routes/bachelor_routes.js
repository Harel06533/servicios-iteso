"use strict";
import BachelorModel from "../models/bachelorModel";
import { Router } from "express";
import Bachelor from "../controllers/bachelor";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const name = req.query("name");
    if (name) {
      const doc = await BachelorModel.findOne({ name: name });
      res.status(200).send(doc);
    } else {
      res.status(200).send(await BachelorModel.find({}));
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
  const { name, semesters } = req.body;
  const bachelor = new Bachelor(name, semesters);
  try {
    const modeled = BachelorModel(bachelor.toJSON());
    await modeled.save();
    res.status(201).send("Bachelor created");
  } catch (e) {
    res.sendStatus(403);
    console.error(e);
  }
});

export default router;
