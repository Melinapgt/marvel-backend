const mongoose = require("mongoose");

const FavoriteCharacter = mongoose.model("FavoriteCharacter", {
  userId: String,
  characterId: String,
  characterName: String,
  pictureCharacter: String,
});

module.exports = FavoriteCharacter;
