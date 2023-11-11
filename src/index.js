const express = require("express");
const path = require("path");
const dotenv = require("dotenv"); // for managing enviroment variables
dotenv.config();

const PORT = process.env["PORT"] || 3000;
const app = express();

// only recieves json on the body
app.use(express.json());

// use static
app.use(express.static(path.join(__dirname, "../public")));

// on home, render the login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
});

// start the app
app.listen(PORT, () => {
  console.log(`App running in http://localhost:${PORT}`);
});
