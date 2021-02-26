const express = require("express");
const router = express.Router();
const Mensaje = require("../modelos/Mensaje");

router.get("/", async (req, res) => {
  const mensajes = await Mensaje.findAll();
  return res.status(200).json(mensajes);
});

module.exports = router;
