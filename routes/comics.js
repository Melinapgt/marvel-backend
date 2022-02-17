const express = require("express");
const router = express.Router();
const axios = require("axios");

// API MARVEL
const apikey = process.env.MARVEL_APIKEY;

router.get("/comics", async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.query.title);

    //gestion des query pour la recherche soit title soit name
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`
      // `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}?title=${filter}`
    );
    // console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
