const express = require("express");
const router = express.Router();
const Imagen = require("../modelos/Imagen");

router.get("/", async (req, res) => {
  const imagenes = await Imagen.findAll();
  return res.status(200).json(imagenes);
});

module.exports = router;
