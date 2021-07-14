const express = require("express");
const router = express.Router();
const Trivia = require("../modelos/modelosMongo/Trivia");

router.get("/", async (req, res) => {
  Trivia.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
