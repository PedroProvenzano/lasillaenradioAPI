const express = require("express");
const router = express.Router();

// Rutas
// Get
// Conseguir imagen
const imagen = require("../Imagen/conseguirImagen");
router.use("/todas", imagen);

module.exports = router;
