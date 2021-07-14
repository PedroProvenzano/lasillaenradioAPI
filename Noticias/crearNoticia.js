const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/modelosMongo/Noticia");

// Crear Noticias

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
      await Noticia.findOneAndUpdate(
        {
          importancia: req.body.importancia,
        },
        {
          importancia: "normal",
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
    }
    const noticiaNueva = new Noticia({
      titulo: req.body.titulo,
      contenido: req.body.contenido,
      imagenesUrl: req.body.imagenesUrl,
      tags: req.body.tags,
      temaPrincipal: req.body.temaPrincipal,
      importancia: req.body.importancia,
      autor: req.body.autor,
    });
    noticiaNueva.save((err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res
          .status(201)
          .send(`Noticia creada correctamente, ${JSON.stringify(result)}`);
      }
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
