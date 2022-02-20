//Routes pour les Comics ajouté en favoris
const express = require("express");
const axios = require("axios");
const router = express.Router();

//Etape 1
// au clic on récupère l'id et le title
//Etape 2
//création en BDD
//Etape 3
//quand l'utilisateur souhaite accéder à la page il faut vérifier qu'il soit connecté sinon login et redirection sur la page Favorites
// Etape 4
//sur la page on fait requête à  l'aide des éléménts en bdd

const FavoriteComic = require("../Models/FavoriteComic");

//création en BDD
router.post("/ajout/favoris/comics", async (req, res) => {
  try {
    console.log(req.fields);

    const { userId, comicsId, title } = req.fields;

    const isUserIdExisting = await FavoriteComic.findOne({ userId });
    // console.log("isUserIdExisting==>", isUserIdExisting);
    if (!isUserIdExisting) {
      const newFavoriteComics = new FavoriteComic({
        userId,
        comicsId,
        title,
      });

      await newFavoriteComics.save();
      res.status(200).json({ message: "Ajouté!" });
    } else {
      const isComicsIdExisting = await FavoriteComic.findOne({ comicsId });
      if (!isComicsIdExisting) {
        const newFavoriteComics = new FavoriteComic({
          userId,
          comicsId,
          title,
        });

        await newFavoriteComics.save();
        res.status(200).json({ message: "Ajouté!" });
      } else {
        res.status(409).json({ message: "Comics déjà ajouté aux favoris" });
      }
    }
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(404).json({ error: "Bad request" });
  }
});

module.exports = router;
