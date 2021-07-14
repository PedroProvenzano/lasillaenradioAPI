const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/modelosMongo/Noticia");

router.get("/", async (req, res) => {
  const temaPrin = req.body.temaPrincipal;
  Noticia.find({ temaPrincipal: temaPrin }, (err, resultado) => {
    if (err) {
      res.json(err);
    } else {
      return res.status(200).json(resultado);
    }
  });
});

module.exports = router;
