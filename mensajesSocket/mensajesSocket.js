require("dotenv/config");
const getVideoId = require("get-video-id");
const Noticia = require("../modelos/modelosMongo/Noticia");
const Mensaje = require("../modelos/modelosMongo/Mensaje");
const Imagen = require("../modelos/modelosMongo/Imagen");
const Trivia = require("../modelos/modelosMongo/Trivia");
const Visita = require("../modelos/modelosMongo/Visita");
const Meme = require("../modelos/modelosMongo/Meme");
const Entrevista = require("../modelos/modelosMongo/Entrevista");
class SocketHandle {
  constructor(io) {
    this.io = io;
  }

  async HandleDatabase(msg) {
    if (msg.type == "contador") {
      await Visita.find((err, result) => {
        if (err) {
          console.log(err);
        }
        this.io.emit("contador", {
          id: msg.id,
          numerovisitas: result[0].numerovisitas,
        });
        return;
      });
    }
    if (msg.type == "eliminarNoticia") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      Noticia.deleteOne(
        {
          id: msg.noticiaId,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            let mensajeDel = {
              id: msg.id,
              msg: `Eliminado correctamente`,
            };
            this.io.emit("respPostNoticia", mensajeDel);
            return;
          }
        }
      );
    }
    if (msg.type == "conseguirNoticia") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      Noticia.findOne({ titulo: msg.titulo }, (err, result) => {
        if (err) {
          console.log(err);
          let errEdit = {
            id: msg.id,
            msg: `Noticia no encontrada`,
          };
          this.io.emit("error", errEdit);
        } else {
          let msgEdit = {
            id: msg.id,
            noticia: result,
          };
          this.io.emit("noticiaAEditar", msgEdit);
        }
      });
    }

    if (msg.type == "postNoticia") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
        };
        this.io.emit("error", respuesta);
        return;
      }
      if (!msg.noticiaId) {
        Noticia.findOne(
          {
            titulo: msg.titulo,
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let respuesta = {
                id: msg.id,
                error: `Noticia ya existe`,
              };
              this.io.emit("error", respuesta);
              return;
            }
          }
        );
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
      if (msg.noticiaId) {
        Noticia.deleteOne({ id: msg.noticiaId }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Noticia eliminada");
          }
        });
      }
      if (
        msg.importancia == "importante1" ||
        msg.importancia == "importante2" ||
        msg.importancia == "importante3" ||
        msg.importancia == "importante4" ||
        msg.importancia == "importante5" ||
        msg.importancia == "importante6"
      ) {
        Noticia.findOneAndUpdate(
          {
            importancia: msg.importancia,
          },
          {
            importancia: "normal",
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
      if (
        msg.temaPrincipal == "Vida sana" ||
        msg.temaPrincipal == "Medio ambiente" ||
        msg.temaPrincipal == "Genero" ||
        msg.temaPrincipal == "curiosidades" ||
        msg.temaPrincipal == "ecofin" ||
        msg.temaPrincipal == "actualidad-front-uno" ||
        msg.temaPrincipal == "actualidad-front-dos"
      ) {
        Noticia.findOneAndUpdate(
          { temaPrincipal: msg.temaPrincipal },
          {
            temaPrincipal: "viejo",
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("noticia cambiada");
            }
          }
        );
      }
      let newYoutubeUrl;
      if (!msg.youtubeUrl) {
        newYoutubeUrl = "vacio";
      } else {
        const youtubeId = getVideoId(msg.youtubeUrl).id;
        newYoutubeUrl = `https://www.youtube.com/embed/${youtubeId}`;
      }
      let fuenteEnviar;
      if (!msg.fuente) {
        fuenteEnviar = "Original";
      } else {
        fuenteEnviar = msg.fuente;
      }
      const nuevaNoticia = new Noticia({
        titulo: msg.titulo,
        contenido: msg.contenido,
        contenidoRes: msg.contenidoRes,
        imagenesUrl: msg.imagenesUrl,
        tags: msg.tags,
        temaPrincipal: msg.temaPrincipal,
        importancia: msg.importancia,
        autor: msg.autor,
        fuente: fuenteEnviar,
        youtubeUrl: newYoutubeUrl,
      });
      nuevaNoticia.save((err, result) => {
        if (err) {
          let respuesta = {
            id: msg.id,
            error: err,
          };
          this.io.emit("respPostNoticia", respuesta);
          return;
        } else {
          let respuesta = {
            id: msg.id,
            msg: `Creado correctamente`,
          };
          this.io.emit("respPostNoticia", respuesta);
          return;
        }
      });
    }
    if (msg.type == "getMensajes") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
        };
        this.io.emit("error", respuesta);
        return;
      }
      Mensaje.find((err, result) => {
        if (err) {
          console.log(err);
        } else {
          let respuesta = {
            id: msg.id,
            mensajes: result,
          };
          console.log(respuesta.mensajes);
          this.io.emit("mensajesNuevos", respuesta);
          return;
        }
      });
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
      Mensaje.deleteOne({ id: msg.msgID }, (err, result) => {
        if (err) {
          console.log(err);
          let respuesta = {
            id: msg.id,
            mensaje: `ID de mensaje no encontrado`,
            boolCheck: false,
          };
          this.io.emit("mensajeEliminado", respuesta);
        } else {
          let respuesta = {
            id: msg.id,
            msgID: msg.msgID,
            mensaje: `Mensaje eliminado correctamente`,
            boolCheck: true,
          };
          this.io.emit("mensajeEliminado", respuesta);
          return;
        }
      });
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
      Imagen.deleteMany({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const newImage = new Imagen({
            imgUrl: msg.imgUrl,
            descripcion: msg.descripcion,
            autor: msg.autor,
          });
          newImage.save((err, result) => {
            if (err) {
              console.log(err);
              let respuesta = {
                id: msg.id,
                error: err,
              };
              this.io.emit("error", respuesta);
            } else {
              let respImg = {
                id: msg.id,
                msg: `Imagen del día cargada correctamente`,
              };
              this.io.emit("respPostNoticia", respImg);
            }
          });
        }
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
      Trivia.deleteMany({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const newTrivia = new Trivia({
            pregunta: msg.pregunta,
            respuestaUno: msg.respuestaUno,
            respuestaDos: msg.respuestaDos,
            respuestaTres: msg.respuestaTres,
            solucion: msg.solucion,
          });
          newTrivia.save((err, result) => {
            if (err) {
              console.log(err);
              let respuesta = {
                id: msg.id,
                error: err,
              };
              this.io.emit("error", respuesta);
              return;
            } else {
              let respTriv = {
                id: msg.id,
                msg: `Trivia creada correctamente`,
              };
              this.io.emit("respPostNoticia", respTriv);
              return;
            }
          });
        }
      });
    }
    // Memes
    if (msg.type == "postMeme") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      // Cargar meme
      Meme.deleteMany({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const newMeme = new Meme({
            imgUrl: msg.imgUrl,
          });
          newMeme.save((err, result) => {
            if (err) {
              console.log(err);
              let respuesta = {
                id: msg.id,
                error: err,
              };
              this.io.emit("error", respuesta);
            } else {
              let respImg = {
                id: msg.id,
                msg: `Meme cargado correctamente`,
              };
              this.io.emit("respPostNoticia", respImg);
            }
          });
        }
      });
    }
    // Entrevista
    if (msg.type == "postEntre") {
      if (msg.adminPass != process.env.ADMIN_PASS) {
        let respuesta = {
          id: msg.id,
          error: `Admin pass incorrecta`,
          boolCheck: false,
        };
        this.io.emit("error", respuesta);
        return;
      }
      // Cargar entrevista
      console.log("Mensaje: ");
      console.log(msg);
      const newEntre = new Entrevista({
        imgUrl: msg.imgEntre,
        src: msg.srcEntre,
      });
      newEntre.save((err, result) => {
        if (err) {
          console.log(err);
          let respuesta = {
            id: msg.id,
            error: err,
          };
          this.io.emit("error", respuesta);
        } else {
          let respImg = {
            id: msg.id,
            msg: `Entrevista cargada correctamente`,
          };
          this.io.emit("respPostEntre", respImg);
        }
      });
    }
  }
}

module.exports = SocketHandle;
