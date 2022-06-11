const mongoose = require("mongoose");
const moment = require("moment-timezone");
const BuenosAires = moment().tz("America/Argentina/Buenos_Aires");

const EntrevistaSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  src: { type: String, required: true },
  date: { type: Date, default: BuenosAires.format() },
});

module.exports = mongoose.model("Entrevista", EntrevistaSchema);
