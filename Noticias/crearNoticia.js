const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/Noticia");

// Crear Noticia

router.post("/", async (req, res) => {
  try {
    // Check si tiene de valor importante
    if (
      req.body.importancia == "importante1" ||
      req.body.importancia == "importante2" ||
      req.body.importancia == "importante3"
    ) {
      const noticiaEdit = await Noticia.findOne({
        where: { importancia: req.body.importancia },
      });
      noticiaEdit.importancia = "Normal";
      await noticiaEdit.save({ fields: ["importancia"] });
      await noticiaEdit.reload();
    }

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
