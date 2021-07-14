const express = require("express");
const router = express.Router();
const Mensaje = require("../modelos/Mensaje");

router.get("/", async (req, res) => {
  Mensaje.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
