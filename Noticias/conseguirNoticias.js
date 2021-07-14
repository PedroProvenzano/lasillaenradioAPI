const express = require("express");
const router = express.Router();
const Noticia = require("../modelos/modelosMongo/Noticia");

router.get("/", async (req, res) => {
  try {
    const noticias = await Noticia.find();
    return res.status(200).json(noticias);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
