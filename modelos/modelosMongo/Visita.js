const mongoose = require("mongoose");

const VisitaSchema = new mongoose.Schema({
  name: { type: String },
  numerovisitas: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Visita", VisitaSchema);
