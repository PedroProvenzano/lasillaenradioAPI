const express = require("express");
const router = express.Router();
const Entrevista = require("../modelos/Entrevista");

router.get("/", async (req, res) => {
  const entrevistas = await Entrevista.findAll();
  return res.status(200).json(entrevistas);
});

module.exports = router;
