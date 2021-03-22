const express = require("express");
const router = express.Router();
const Trivia = require("../modelos/Trivia");

router.get("/", async (req, res) => {
  const Trivias = await Trivia.findAll();
  return res.status(200).json(Trivias);
});

module.exports = router;
