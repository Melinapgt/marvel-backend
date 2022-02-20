const express = require("express");
const router = express.Router();

const FavoriteCharacter = require("../Models/FavoriteCharacter");
const User = require("../Models/User");

router.post("/ajout/favoris/characters", async (req, res) => {
  try {
    console.log(req.fields);
    const { userToken, pictureCharacter, characterName, characterId } =
      req.fields;

    //recherche de l'userId dans User
    const user = await User.findOne({ token: userToken });
    console.log("user found in User with token==>", user);
    const userId = user._id;
    console.log("userId correspondant==>", userId);

    const isUserIdExisting = await FavoriteCharacter.findOne({ userId });

    if (!isUserIdExisting) {
      const newFavoriteCharacter = new FavoriteCharacter({
        userId,
        characterId,
        characterName,
        pictureCharacter,
      });

      await newFavoriteCharacter.save();
      res.status(200).json({ message: "Ajouté!" });
    } else {
      const isCharacterIdExisting = await FavoriteCharacter.findOne({
        characterId,
      });

      if (!isCharacterIdExisting) {
        const newFavoriteCharacter = new FavoriteCharacter({
          userId,
          characterId,
          characterName,
          pictureCharacter,
        });

        await newFavoriteCharacter.save();
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
