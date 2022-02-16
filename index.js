const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

// Connexion à la BDD nommée "marvel" :
// mongoose.connect("mongodb://localhost/marvel");

// Model a déterminer

// API MARVEL
const apikey = "mLFBQvAaDPLUBOq7";

// Routes

app.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).json({ message: "test ok" });
});

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.all("*", (req, res) => {
  res.json({ message: "Page Not Found" });
});

app.listen(4001, () => {
  console.log("Server started");
});