"use strict";
const { Schema } = require("mongoose");

// userSchema configuration
const userSchema = new Schema({
  firstNames: [
    {
      required: true,
      type: String,
    },
  ],
  lastNames: [
    {
      required: true,
      type: String,
    },
  ],

  fullName: {
    required: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },

  personalEmail: {
    required: true,
    type: String,
  },

  studentEmail: {
    required: true,
    type: String,
  },

  bachelor: {
    required: true,
    type: String,
  },

  semester: {
    required: true,
    type: Number,
  },
});

module.exports = userSchema;
