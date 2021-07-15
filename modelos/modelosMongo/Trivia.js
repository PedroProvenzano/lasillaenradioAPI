const mongoose = require("mongoose");
const moment = require("moment-timezone");
const BuenosAires = moment().tz("America/Argentina/Buenos_Aires");

const TriviaSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuestaUno: { type: String, required: true },
  respuestaDos: { type: String, required: true },
  respuestaTres: { type: String, required: true },
  solucion: { type: String, required: false },
  date: { type: Date, default: BuenosAires.format() },
});

module.exports = mongoose.model("Trivia", TriviaSchema);
