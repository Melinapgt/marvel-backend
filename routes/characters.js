const express = require("express");
const router = express.Router();
const axios = require("axios");
const res = require("express/lib/response");

// API MARVEL
const apikey = "mLFBQvAaDPLUBOq7";

//récupérer les infos personnages
router.get("/characters", async (req, res) => {
  try {
    console.log(req.query);

    const getCharacter = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}`
        );
        console.log(response.data);
        res.status(200).json(response.data);
      } catch (error) {
        console.log("error.response ==>", error.response);
      }
    };

    getCharacter();
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
