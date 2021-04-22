const express = require("express");
const router = express.Router();

// Rutas
// Get
// Conseguir meme
const meme = require("../Meme/conseguirMeme");
router.use("/todas", meme);

module.exports = router;
