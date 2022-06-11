const express = require("express");
const Entrevista = require("../modelos/modelosMongo/Entrevista");
const router = express.Router();

router.get("/", async (req, res) => {
  Entrevista.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
