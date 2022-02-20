//Favorite

const mongoose = require("mongoose");

const FavoriteComic = mongoose.model("FavoriteComic", {
  comicsId: String,
  title: String,
  userId: String,
});

module.exports = FavoriteComic;
