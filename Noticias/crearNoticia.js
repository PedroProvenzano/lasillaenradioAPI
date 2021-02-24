const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/Noticia");

// Crear Noticia

router.post("/", async (req, res) => {
  try {
    Noticia.create({
      titulo: req.body.titulo,
      contenido: req.body.contenido,
      imagenesUrl: req.body.imagenesUrl,
      tags: req.body.tags,
      temaPrincipal: req.body.temaPrincipal,
      importancia: req.body.importancia,
      autor: req.body.autor,
    }).then(() => {
      res.status(201).send(`Noticia creada correctamente`);
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
