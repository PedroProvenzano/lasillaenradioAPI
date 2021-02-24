const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/Noticia");

router.get("/", async (req, res) => {
  const noticias = await Noticia.findAll();
  return res.status(200).json(noticias);
});

module.exports = router;
