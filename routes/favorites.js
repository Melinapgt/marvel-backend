const express = require("express");
const router = express.Router();
const axios = require("axios");

const FavoriteComic = require("../Models/FavoriteComic");
const FavoriteCharacter = require("../Models/FavoriteCharacter");
const User = require("../Models/User");

//Afficher les favoris dans la page -------------------

router.get("/favoris", async (req, res) => {
  try {
    console.log("Page favoris, comics, req.fields", req.query);

    const { userToken } = req.query;
    //Trouver le user avec le token
    const user = await User.findOne({ token: userToken });
    console.log("user found in User with token==>", user);
    //puis le userID
    const userId = user._id;
    // console.log("userId correspondant==>", userId);

    const favoritesComics = await FavoriteComic.find({ userId });
    // console.log("favorisComics ==>", favorisComics);
    const favoritesCharacters = await FavoriteCharacter.find({ userId });
    res.status(200).json({ favoritesComics, favoritesCharacters });
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(404).json({ error: "Bad request" });
  }
});

module.exports = router;
