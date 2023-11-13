const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv"); // for managing enviroment variables
dotenv.config();

const PORT = process.env["PORT"] || 3000;
const app = express();

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

// on home, render the login
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/login-form.html"));
});

// start the app
app.listen(PORT, () => {
  console.log(`App running in http://localhost:${PORT}`);
});
