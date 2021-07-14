const mongoose = require("mongoose");

const MemeSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meme", MemeSchema);
