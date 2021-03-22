const Mensaje = require("../modelos/Mensaje");
const Noticia = require("../modelos/Noticia");
const Imagen = require("../modelos/Imagen");
const Trivia = require("../modelos/Trivia");

(async () => {
  await Mensaje.sync();
  await Noticia.sync();
  await Imagen.sync();
  await Trivia.sync();
})();
