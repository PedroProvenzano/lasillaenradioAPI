const express = require("express");
const router = express.Router();
const Visita = require("../modelos/modelosMongo/Visita");

router.get("/", async (req, res) => {
  Visita.findOne({ name: "visitas" }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      Visita.findOneAndUpdate(
        { name: "visitas" },
        { numerovisitas: result.numerovisitas + 1 },
        (err, resultDos) => {
          if (err) {
            console.log(err);
          } else {
            console.log(resultDos);
            return res.status(200).send("Visita!");
          }
        }
      );
    }
  });
});

module.exports = router;
