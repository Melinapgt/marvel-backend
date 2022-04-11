const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

const User = require("../Models/User");

router.post("/login", async (req, res) => {
  try {
    console.log(req.fields);

    const { email, password } = req.fields;

    const isEmailExisting = await User.findOne({ email: email });
    console.log(isEmailExisting);

    if (!isEmailExisting) {
      res.status(401).json({ message: "Incorrect email or password!" });
    } else {
      const newHash = SHA256(password + isEmailExisting.salt).toString(
        encBase64
      );

      if (isEmailExisting.hash === newHash) {
        res.status(200).json({
          userId: isEmailExisting.id,
          userToken: isEmailExisting.token,
          firstname: isEmailExisting.firstname,
        });
      } else {
        res
          .status(401)
          .json({
            error: "Unauthorized",
            message: "Incorrect email or password!",
          });
      }
    }
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(404).json({ message: "Bad request" });
  }
});

module.exports = router;
