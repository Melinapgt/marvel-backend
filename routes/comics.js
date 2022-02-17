const express = require("express");
const router = express.Router();
const axios = require("axios");

// API MARVEL
const apikey = process.env.MARVEL_APIKEY;

router.get("/comics", async (req, res) => {
  try {
    console.log(req.query);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`
    );
    console.log(response.data);
    res.status(200).json(response.data);

    // const results = response.data.results;

    res.json(results);
  } catch (error) {
    console.log("error.response ==>", error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
