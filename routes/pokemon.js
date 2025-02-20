const express = require("express");
const axios = require('axios');
const dotenv = require("dotenv");
const pokemonRouter = require("../routes/pokemon");
dotenv.config();

const router = express.Router();
const API_URL = process.env.API_URL;

router.get("/", async (req, res) => {
  try {
      const response = await axios.get(`${API_URL}?limit=20`);  
      const pokemonList = await Promise.all(response.data.results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          return {
              name: pokemon.name,
              sprites: pokemonData.data.sprites // Get the full sprite data
          };
      }));

      return res.render("pages/home", { pokemonList });      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/pokemon/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const response = await axios.get(`${API_URL}/${name}`);
      return res.render("pages/details", { pokemon: response.data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


  router.get("/search", async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) return res.redirect("/");
      const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
      return res.render("pages/details", { pokemon: response.data });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  module.exports = router;