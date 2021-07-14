const express = require("express");
const router = express.Router();
const Meme = require("../modelos/modelosMongo/Meme");

router.get("/", async (req, res) => {
  Meme.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
