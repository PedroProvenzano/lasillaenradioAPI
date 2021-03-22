const express = require("express");
const router = express.Router();

// Rutas
// Get
// Conseguir imagen
const trivia = require("../Trivia/conseguirTrivia");
router.use("/todas", trivia);

module.exports = router;
