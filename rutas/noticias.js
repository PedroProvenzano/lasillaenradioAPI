const express = require("express");
const router = express.Router();

// Rutas

// Get
// Conseguir noticias
const noticias = require("../Noticias/conseguirNoticias");
router.use("/todas", noticias);

const noticiasTema = require("../Noticias/temaNoticias");
router.use("/tema", noticiasTema);

module.exports = router;
