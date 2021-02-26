var socket = io();

// Generar ID unica de cliente
let arrayID = new Uint32Array(3);
let cryptedID = window.crypto.getRandomValues(arrayID);
let clientID = cryptedID.toString("hex");

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
