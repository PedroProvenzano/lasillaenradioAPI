const mongoose = require("mongoose");
const moment = require("moment-timezone");
const BuenosAires = moment().tz("America/Argentina/Buenos_Aires");

const ImagenSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  autor: { type: String, required: true },
  descripcion: { type: String, required: false },
  date: { type: Date, default: BuenosAires.format() },
});

module.exports = mongoose.model("Imagen", ImagenSchema);
