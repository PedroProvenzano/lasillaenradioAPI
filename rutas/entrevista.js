const express = require("express");
const router = express.Router();

// Rutas
// Get
// Conseguir entrevista
const entrevista = require("../Entrevista/conseguirEntrevista");
router.use("/todas", entrevista);

module.exports = router;
