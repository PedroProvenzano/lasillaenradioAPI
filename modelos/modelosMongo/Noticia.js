const mongoose = require("mongoose");

const NoticiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  contenidoRes: { type: String, required: true },
  imagenesUrl: { type: String, required: true },
  tags: { type: String, required: false },
  temaPrincipal: { type: String, required: true },
  importancia: { type: String, required: false },
  autor: { type: String, required: true },
  fuente: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Noticia", NoticiaSchema);
