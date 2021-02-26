const express = require("express");
const router = express.Router();

// Rutas
// Post
const enviarMensaje = require("../Mensajes/enviarMensajes");
router.use("/enviar", enviarMensaje);

// Get
// Conseguir noticias
const mensajes = require("../Mensajes/conseguirMensajes");
router.use("/todas", mensajes);

module.exports = router;
