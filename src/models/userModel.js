"use strict";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  // [ firstname, secondname ]
  first_names: [
    {
      required: true,
      type: String,
    },
  ],

  // [lastname, secondlastname]
  last_names: [
    {
      required: true,
      type: String,
    },
  ],

  // firstname + secondname + lastname + secondlastname
  full_name: {
    required: true,
    type: String,
  },

  // 000000
  expedient: {
    required: true,
    type: String,
  },

  // 000
  verifier_digit: {
    required: true,
    type: String,
  },

  // hashed password
  password: {
    required: true,
    type: String,
  },

  // email@email.com
  personal_email: {
    required: true,
    type: String,
  },

  // email@iteso.mx
  student_email: {
    required: true,
    type: String,
  },

  // 33-333-3333
  phone_number: {
    required: true,
    type: String,
  },

  location: {
    required: true,
    type: String,
  },

  // bachelor
  bachelor: {
    required: true,
    type: String,
  },

  // semester number
  semester: {
    required: true,
    type: Number,
  },

  // subjects taken
  subjects_taken: [
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
    },
  ],

  // number of taken credits
  num_of_credits: {
    required: true,
    type: Number,
  },

  // percent of credits
  credits_percent: {
    required: true,
    type: Number,
  },

  // grade of the user
  grade: {
    required: true,
    type: Number,
  },

  // debts [{ "reason": 00 -- amount }]
  debts: [
    {
      reason: {
        required: true,
        type: String,
      },
      amount: {
        required: true,
        type: Number,
      },
    },
  ],
});

const UserModel = model("users", userSchema);
export default UserModel;
