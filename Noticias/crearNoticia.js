const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/Noticia");

// Crear Noticia

router.post("/", async (req, res) => {
  try {
    // Check si tiene de valor importante
    console.log(req.body.importancia);
    if (
      req.body.importancia == "importante1" ||
      req.body.importancia == "importante2" ||
      req.body.importancia == "importante3"
    ) {
      console.log("Pase por Importante");
      const noticiaEdit = await Noticia.findOne({
        where: { importancia: req.body.importancia },
      });
      noticiaEdit.importancia = "normal";
      await noticiaEdit.save({ fields: ["importancia"] });
      await noticiaEdit.reload();
      console.log(noticiaEdit);
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
