const Mensaje = require("../modelos/Mensaje");
const Noticia = require("../modelos/Noticia");
const Imagen = require("../modelos/Imagen");

(async () => {
  await Mensaje.sync();
  await Noticia.sync();
  await Imagen.sync();
})();
