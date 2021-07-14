const mongoose = require("mongoose");

const MensajeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nombre: { type: String, required: true },
  barrio: { type: String, required: true },
  contenido: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mensaje", MensajeSchema);
