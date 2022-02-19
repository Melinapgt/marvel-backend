const mongoose = require("mongoose");

//User

const User = mongoose.model("User", {
  firstname: String,
  lastname: String,
  email: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
