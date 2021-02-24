const express = require("express");
const router = express.Router();

// Rutas
// Post
// Crear Noticia
const crearNoticia = require("../Noticias/crearNoticia");
router.use("/add", crearNoticia);

// Get
// Conseguir noticias
const noticias = require("../Noticias/conseguirNoticias");
router.use("/todas", noticias);

module.exports = router;
