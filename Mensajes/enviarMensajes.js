const express = require("express");
const router = express.Router();
const Mensaje = require("../modelos/Mensaje");

router.post("/", async (req, res) => {
  if (
    req.body.email == null ||
    req.body.nombre == null ||
    req.body.contenido == null ||
    req.body.barrio == null
  ) {
    return res.status(400).send(`Falta informacion`);
  }
  Mensaje.create({
    email: req.body.email,
    nombre: req.body.nombre,
    barrio: req.body.barrio,
    contenido: req.body.contenido,
  })
    .then(() => {
      return res.status(200).send(`Mensaje enviado correctamente`);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
