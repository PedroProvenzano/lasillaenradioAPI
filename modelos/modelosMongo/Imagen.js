const mongoose = require("mongoose");

const ImagenSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  autor: { type: String, required: true },
  descripcion: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Imagen", ImagenSchema);
