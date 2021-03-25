require("dotenv/config");
const Noticia = require("../modelos/Noticia");
const Mensaje = require("../modelos/Mensaje");
const Imagen = require("../modelos/Imagen");
const Trivia = require("../modelos/Trivia");
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

      if (
        msg.titulo == "" ||
        msg.contenido == "" ||
        msg.contenidoRes == "" ||
        msg.imagenesUrl == "" ||
        msg.tags == "" ||
        msg.autor == ""
      ) {
        let respuesta = {
          id: msg.id,
          error: `Falta completar algun campo`,
        };
        this.io.emit("error", respuesta);
        return;
      }

      if (
        msg.importancia == "importante1" ||
        msg.importancia == "importante2" ||
        msg.importancia == "importante3"
      ) {
        const noticiaEdit = await Noticia.findOne({
          where: { importancia: msg.importancia },
        });
        if (noticiaEdit != null) {
          noticiaEdit.importancia = "normal";
          await noticiaEdit.save({ fields: ["importancia"] });
          await noticiaEdit.reload();
        }
      }
      if (
        msg.temaPrincipal == "Vida sana" ||
        msg.temaPrincipal == "Medio ambiente" ||
        msg.temaPrincipal == "Genero"
      ) {
        const notaVida = await Noticia.findOne({
          where: { temaPrincipal: msg.temaPrincipal },
        });
        if (notaVida != null) {
          Noticia.destroy({ where: { temaPrincipal: msg.temaPrincipal } });
        }
      }
      let fuenteEnviar;
      if (!msg.fuente) {
        fuenteEnviar = "Original";
      } else {
        fuenteEnviar = msg.fuente;
      }
      Noticia.create({
        titulo: msg.titulo,
        contenido: msg.contenido,
        contenidoRes: msg.contenidoRes,
        imagenesUrl: msg.imagenesUrl,
        tags: msg.tags,
        temaPrincipal: msg.temaPrincipal,
        importancia: msg.importancia,
        autor: msg.autor,
        fuente: fuenteEnviar,
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
    if (msg.type == "delMensaje") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      const mensajeEliminar = await Mensaje.findOne({
        where: { id: msg.msgID },
      });
      if (mensajeEliminar != null) {
        mensajeEliminar.destroy();
        let respuesta = {
          id: msg.id,
          msgID: msg.msgID,
          mensaje: `Mensaje eliminado correctamente`,
          boolCheck: true,
        };
        this.io.emit("mensajeEliminado", respuesta);
        return;
      } else {
        let respuesta = {
          id: msg.id,
          mensaje: `ID de mensaje no encontrado`,
          boolCheck: false,
        };
        this.io.emit("mensajeEliminado", respuesta);
        return;
      }
    }
    if (msg.type == "postImagenDelDia") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      // Cargar imagen
      const imagenes = await Imagen.findAll();
      if (imagenes.length > 0) {
        Imagen.destroy({ where: { id: 1 } });
      }
      Imagen.create({
        imgUrl: msg.imgUrl,
        descripcion: msg.descripcion,
        autor: msg.autor,
      })
        .then(() => {
          let respImg = {
            id: msg.id,
            msg: `Imagen del día cargada correctamente`,
          };
          this.io.emit("respPostNoticia", respImg);
        })
        .catch((err) => {
          let respuesta = {
            id: msg.id,
            error: err,
          };
          this.io.emit("error", respuesta);
          return;
        });
    }
    if (msg.type == "postTrivia") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      // Cargar Trivia
      const trivias = await Trivia.findAll();
      if (trivias.length > 0) {
        Trivia.destroy({ where: { id: 1 } });
      }
      Trivia.create({
        pregunta: msg.pregunta,
        respuestaUno: msg.respuestaUno,
        respuestaDos: msg.respuestaDos,
        respuestaTres: msg.respuestaTres,
        solucion: msg.solucion,
      })
        .then(() => {
          let respTriv = {
            id: msg.id,
            msg: `Trivia creada correctamente`,
          };
          this.io.emit("respPostNoticia", respTriv);
          return;
        })
        .catch((err) => {
          let respuesta = {
            id: msg.id,
            error: err,
          };
          this.io.emit("error", respuesta);
          return;
        });
    }
  }
}

module.exports = SocketHandle;
