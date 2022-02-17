const express = require("express");
const router = express.Router();
const axios = require("axios");

// API MARVEL
const apikey = process.env.MARVEL_APIKEY;

router.get("/comics", async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.query.title);

    // gestion de la recherche
    const search = req.query.title;

    //gestion des pages
    const limit = 100;
    const page = req.query.page;
    const skip = (page - 1) * limit;
    console.log(skip);

    if (search) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&title=${search}&skip=${skip}`
      );
      res.status(200).json(response.data);
    } else {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&skip=${skip}`
      );
      res.status(200).json(response.data);
    }

    // console.log(response.data);
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
