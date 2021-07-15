const mongoose = require("mongoose");
const moment = require("moment-timezone");
const BuenosAires = moment().tz("America/Argentina/Buenos_Aires");

const MensajeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nombre: { type: String, required: true },
  barrio: { type: String, required: true },
  contenido: { type: String, required: true },
  date: { type: Date, default: BuenosAires.format() },
});

module.exports = mongoose.model("Mensaje", MensajeSchema);
