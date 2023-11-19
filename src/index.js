const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv"); // for managing enviroment variables
const router = require("./router");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env["PORT"] || 3000;
const USERS_DB_URL = process.env["USERS_DB"] || "";
const app = express();

// database setup
const connection = mongoose.connection;
connection.on("connecting", () => {
  console.log("connecting to the database");
});

connection.on("connected", () => {
  console.log("Server has connected succesfully to the database");
  console.log(connection.readyState);
});
mongoose.connect(USERS_DB_URL);

// cors accepts every http method
app.use(
  cors({
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "UPDATE"],
  })
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
