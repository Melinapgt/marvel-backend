const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// Connexion à la BDD nommée "marvel-comics" :
mongoose.connect("mongodb://localhost/marvel-comics");

// Routes

app.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).json({ message: "test ok" });
});

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsCharacterIdRoutes = require("./routes/comicsCharacterId");
app.use(comicsCharacterIdRoutes);

const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

app.all("*", (req, res) => {
  res.json({ message: "Page Not Found" });
});

app.listen(4001, () => {
  console.log("Server started");
});
