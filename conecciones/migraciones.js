const Mensaje = require("../modelos/Mensaje");
const Noticia = require("../modelos/Noticia");

(async () => {
  await Mensaje.sync();
  await Noticia.sync();
})();
