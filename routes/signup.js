const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const router = express.Router();

//Imports models
const User = require("../Models/User");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.fields);

    const { firstname, lastname, email, password } = req.fields;

    // Je recherche dans la BDD Marvel si l'email existe puis si celle ci correspond au nom et prénom
    const isEmailExisting = await User.findOne({ email: email });
    console.log(isEmailExisting);

    if (isEmailExisting) {
      res.status(409).json({
        message: "This email is already used for an existing account!",
      });
    } else {
      //authentification
      const salt = uid2(64);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(20);

      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        salt: salt,
        hash: hash,
        token: token,
      });

      await newUser.save();
      res.status(201).json({
        userId: newUser.id,
        userToken: newUser.token,
        firstname: newUser.firstname,
        message: "Welcom ! Your account has been succesfully created !",
      });
    }
  } catch (error) {
    console.log("error.message ==>", error.message);
    res.status(404).json({ error: "Bad request" });
  }
});

module.exports = router;
