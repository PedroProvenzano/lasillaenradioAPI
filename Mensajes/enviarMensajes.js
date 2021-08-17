const express = require("express");
const router = express.Router();
const Mensaje = require("../modelos/modelosMongo/Mensaje");

router.post("/", async (req, res) => {
  console.log(JSON.stringify(req.body));
  if (
    req.body.email == null ||
    req.body.nombre == null ||
    req.body.contenido == null ||
    req.body.barrio == null
  ) {
    return res.status(400).send(`Falta informacion`);
  }
  const nuevoMensaje = new Mensaje({
    email: req.body.email,
    nombre: req.body.nombre,
    barrio: req.body.barrio,
    contenido: req.body.contenido,
  });
  nuevoMensaje.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).send(`Mensaje enviado correctamente`);
    }
  });
});

module.exports = router;
