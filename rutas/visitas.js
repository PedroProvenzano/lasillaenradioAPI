const express = require("express");
const router = express.Router();

// Rutas
// Get
// Agregar Visita
const visitas = require("../Visitas/agregarVisita");
router.use("/add", visitas);

const crearVisitas = require("../Visitas/crearVisitas");
router.use("/crear", crearVisitas);
module.exports = router;
