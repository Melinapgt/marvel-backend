const express = require("express");
const router = express.Router();
const axios = require("axios");

// API MARVEL
const apikey = process.env.MARVEL_APIKEY;

router.get("/comics/:characterId", async (req, res) => {
  try {
    console.log(req.params);
    const params = req.params.characterId;
    console.log(params);
    console.log(req.query);
    console.log(req.query.title);

    const search = req.query.title;

    if (search) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${params}?apiKey=${apikey}&title=${search}`
      );
      // console.log(response.data);
      res.status(200).json(response.data);
    } else {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${params}?apiKey=${apikey}`
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
