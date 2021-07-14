const express = require("express");
const router = express.Router();
const Imagen = require("../modelos/modelosMongo/Imagen");

router.get("/", async (req, res) => {
  Imagen.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
