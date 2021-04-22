const express = require("express");
const router = express.Router();
const Meme = require("../modelos/Meme");

router.get("/", async (req, res) => {
  const meme = await Meme.findAll();
  return res.status(200).json(meme);
});

module.exports = router;
