const express = require("express");
const router = express.Router();
const Visita = require("../modelos/modelosMongo/Visita");

router.get("/", async (req, res) => {
  const nuevavisitas = new Visita({
    name: "visitas",
    numerovisitas: 2000,
  });
  nuevavisitas.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

module.exports = router;
