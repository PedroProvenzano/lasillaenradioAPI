var socket = io();

// Generar ID unica de cliente
let arrayID = new Uint32Array(3);
let cryptedID = window.crypto.getRandomValues(arrayID);
let clientID = cryptedID.toString("hex");

// Recibir mensajes
let recibirMensaje = {
  id: clientID,
  type: "getMensajes",
};
socket.emit("mensaje", recibirMensaje);

socket.on("mensajesNuevos", (msg) => {
  if (msg.id == clientID) {
    console.log("Mensajes recibidos");
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
const adminPass = document.getElementById("admin-pass");

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

// Recibe errores
socket.on("error", (msg) => {
  console.log(msg);
});
