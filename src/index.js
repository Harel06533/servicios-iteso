"use strict";
import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import initializeDatabase from "./database.config";
dotenv.config();
const PORT = process.env["PORT"] || 3000;
const app = express();

// database setup connection
initializeDatabase();

// can render ejs files
app.set("view engine", "ejs");

// cors accepts every http method
app.use(
  cors({
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "UPDATE"],
  }),
);

// only recieves json on the body
app.use(express.json());

// use static
app.use(express.static(path.join(__dirname, "../public"))); // static on public files
app.use(express.static(path.join(__dirname, "../views"))); // static on views files (html templates)

// send all request to the router
app.use(router);

// start the app
app.listen(PORT, () => {
  console.log(`App running in http://localhost:${PORT}`);
});
