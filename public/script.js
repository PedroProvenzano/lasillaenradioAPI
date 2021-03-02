var socket = io();

// Generar ID unica de cliente
let arrayID = new Uint32Array(3);
let cryptedID = window.crypto.getRandomValues(arrayID);
let clientID = cryptedID.toString("hex");
// Admin pass Input
const adminPass = document.getElementById("admin-pass");
// Recibir mensajes
let recibirMensaje = {
  id: clientID,
  type: "getMensajes",
};
socket.emit("mensaje", recibirMensaje);

const contenedorMensajes = document.getElementById("contenedor-mensajes");

socket.on("mensajesNuevos", (msg) => {
  if (msg.id == clientID) {
    let equisIDS;
    let arrayMsj = msg.mensajes;
    let mensajeSocket;
    contenedorMensajes.innerHTML = "";
    for (let i of arrayMsj) {
      contenedorMensajes.innerHTML += `<div class="mensaje" id="mensaje-${i.id}">
      <i class="far fa-times-circle mensaje-equis" id="equis-id-${i.id}"></i>
      <p class="mensaje-nombre">Nombre: ${i.nombre}</p>
      <p class="mensaje-email">Email: ${i.email}</p>
      <p class="titulo-mensaje">Mensaje:</p>
      <p class="mensaje-contenido">
      ${i.contenido}
      </p>
      <p class="mensaje-id">${i.id}</p>
      <p class="mensaje-fecha">Fecha del mensaje: ${i.createdAt}</p>
    </div>`;
      equisIDS = document.getElementById(`equis-id-${i.id}`);
      equisIDS.addEventListener("click", () => {
        mensajeSocket = {
          id: clientID,
          type: "delMensaje",
          msgID: i.id,
          adminPass: adminPass.value,
        };
        socket.emit("mensaje", mensajeSocket);
      });
    }
  }
});

// Script De HUD
const botonNoticias = document.getElementById("titulo-noticias");
const botonMensajes = document.getElementById("titulo-mensajes");

// Escenas
const noticias = document.getElementById("noticias");
const mensajes = document.getElementById("mensajes");

botonNoticias.addEventListener("click", () => {
  noticias.style.display = "flex";
  mensajes.style.display = "none";
});

botonMensajes.addEventListener("click", () => {
  noticias.style.display = "none";
  mensajes.style.display = "flex";
});

// Postear Noticias

const botonSend = document.getElementById("boton-send");
// Inputs
const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");
const contenidoRes = document.getElementById("contenidoRes");
const imagenes = document.getElementById("imagenes");
const tags = document.getElementById("tags");
const temaPrincipal = document.getElementById("temaPrincipal");
const importancia = document.getElementById("importancia");
const autor = document.getElementById("autor");

let imagenesFinal;
let tagsFinal;

botonSend.addEventListener("click", () => {
  imagenesFinal = `[${imagenes.value}]`;
  tagsFinal = `[${tags.value}]`;
  let postNoticia = {
    id: clientID,
    adminPass: adminPass.value,
    type: "postNoticia",
    titulo: titulo.value,
    contenido: contenido.value,
    contenidoRes: contenidoRes.value,
    imagenesUrl: imagenesFinal,
    tags: tagsFinal,
    temaPrincipal: temaPrincipal.value,
    importancia: importancia.value,
    autor: autor.value,
  };
  socket.emit("mensaje", postNoticia);
});

// Recibe respuesta de mensaje
socket.on("respPostNoticia", (msg) => {
  if (msg.id == clientID) {
    console.log(msg);
  }
});

// Eliminar mensajes
let mensajeAEliminar;

socket.on("mensajeEliminado", (msg) => {
  if (msg.id == clientID) {
    if (msg.boolCheck) {
      mensajeAEliminar = document.getElementById(`mensaje-${msg.msgID}`);
      mensajeAEliminar.remove();
    } else {
      console.log(`Error ${msg.mensaje}`);
    }
  }
});

// Recibe errores
socket.on("error", (msg) => {
  console.log(msg);
});
