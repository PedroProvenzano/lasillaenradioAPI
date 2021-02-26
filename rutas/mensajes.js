const express = require("express");
const router = express.Router();

// Rutas

// Get
// Conseguir noticias
const mensajes = require("../Mensajes/conseguirMensajes");
router.use("/todas", mensajes);

module.exports = router;
