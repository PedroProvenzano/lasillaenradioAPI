const mongoose = require("mongoose");

const TriviaSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuestaUno: { type: String, required: true },
  respuestaDos: { type: String, required: true },
  respuestaTres: { type: String, required: true },
  solucion: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trivia", TriviaSchema);
