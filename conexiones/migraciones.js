const Mensaje = require("../modelos/Mensaje");
const Noticia = require("../modelos/Noticia");
const Imagen = require("../modelos/Imagen");
const Trivia = require("../modelos/Trivia");
const Visita = require("../modelos/Visita");

(async () => {
  await Mensaje.sync();
  await Noticia.sync();
  await Imagen.sync();
  await Trivia.sync();
  await Visita.sync();
})();
