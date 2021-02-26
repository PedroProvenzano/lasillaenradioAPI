require("dotenv/config");
const Noticia = require("../modelos/Noticia");
const Mensaje = require("../modelos/Mensaje");
class SocketHandle {
  constructor(io) {
    this.io = io;
  }

  async HandleDatabase(msg) {
    if (msg.type == "postNoticia") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
        };
        this.io.emit("error", respuesta);
        return;
      }
      Noticia.create({
        titulo: msg.titulo,
        contenido: msg.contenido,
        imagenesUrl: msg.imagenesUrl,
        tags: msg.tags,
        temaPrincipal: msg.temaPrincipal,
        importancia: msg.importancia,
        autor: msg.autor,
      })
        .then(() => {
          let respuesta = {
            id: msg.id,
            msg: `Creado correctamente`,
          };
          this.io.emit("respPostNoticia", respuesta);
          return;
        })
        .catch((err) => {
          let respuesta = {
            id: msg.id,
            error: err,
          };
          this.io.emit("respPostNoticia", respuesta);
          return;
        });
    }
    if (msg.type == "getMensajes") {
      const mensajes = await Mensaje.findAll();
      let respuesta = {
        id: msg.id,
        mensajes: mensajes,
      };
      this.io.emit("mensajesNuevos", respuesta);
      return;
    }
  }
}

module.exports = SocketHandle;
