// database configuration and initialization
"use strict";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_URL = process.env["USERS_DB"] || "";

const connection = mongoose.connection;
connection.on("connecting", () => {
  console.log("connecting to the database");
});

connection.on("connected", () => {
  console.log("Server has connected succesfully to the database");
  console.log(connection.readyState);
});

async function initializeDatabase() {
  try {
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.error("Error on connecting database: + ", e.message);
  }
}
export default initializeDatabase;
