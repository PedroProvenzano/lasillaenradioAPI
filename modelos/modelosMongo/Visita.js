const mongoose = require("mongoose");
const moment = require("moment-timezone");
const BuenosAires = moment().tz("America/Argentina/Buenos_Aires");

const VisitaSchema = new mongoose.Schema({
  name: { type: String },
  numerovisitas: { type: Number },
  date: { type: Date, default: BuenosAires.format() },
});

module.exports = mongoose.model("Visita", VisitaSchema);
