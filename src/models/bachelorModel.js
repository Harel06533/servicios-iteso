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
      subjects: [
        {
          name: {
            required: true,
            type: String,
          },
          area: {
            required: true,
            type: String,
          },
          term: {
            required: true,
            type: String,
          },
          grade: {
            required: true,
            type: Number,
          },
          eval_type: {
            required: true,
            type: String,
          },
          credits: {
            required: true,
            type: Number,
          },
        },
      ],
    },
  ],
  total_credits: {
    required: true,
    type: Number,
  },
});

const BachelorModel = model("bachelors", bachelorSchema);
export default BachelorModel;
