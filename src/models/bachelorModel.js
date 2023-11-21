"use strict";
import { Schema, model } from "mongoose";

const bachelorSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  semesters: [
    {
      number: {
        required: true,
        type: Number,
      },
      credits: {
        required: true,
        type: Number,
      },
    },
  ],
  total_credits: {
    required: true,
    type: Number,
  },
});

const BachelorModel = model("bachelors", bachelorSchema);
export default BachelorModel;
