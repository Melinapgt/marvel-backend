const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// Connexion à la BDD nommée "marvel-comics" :
mongoose.connect(process.env.MONGODB_URI);

// Routes

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsCharacterIdRoutes = require("./routes/comicsCharacterId");
app.use(comicsCharacterIdRoutes);

const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

const loginRoutes = require("./routes/login");
app.use(loginRoutes);

const favoritesComicsRoutes = require("./routes/favoritesComics");
app.use(favoritesComicsRoutes);

const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

const favoritesCharactersRoutes = require("./routes/favoriteCharacters");
app.use(favoritesCharactersRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
