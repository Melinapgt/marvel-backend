const express = require("express");
const router = express.Router();
const axios = require("axios");
const res = require("express/lib/response");

// API MARVEL
const apikey = process.env.MARVEL_APIKEY;

router.get("/characters", async (req, res) => {
  try {
    console.log("req.query ==>", req.query);
    // console.log(req.query.name);
    // console.log(req.query.page);

    //gestion de la recherche
    const search = req.query.name;
    // console.log(search);

    //gestion des pages
    const limit = 100;
    const page = req.query.page;
    const skip = (page - 1) * limit;
    // console.log(skip);

    if (search) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}&name=${search}&skip=${skip}`
      );
      // console.log(response.data);
      res.status(200).json(response.data);
    } else {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}&skip=${skip}`
      );
      // console.log(response.data);
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
