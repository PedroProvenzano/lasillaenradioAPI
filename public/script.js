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

// Consola
const avisoCont = document.getElementById("aviso-cont");
const avisoTitulo = document.getElementById("aviso-titulo");
const avisoTexto = document.getElementById("aviso-texto");
const avisoBoton = document.getElementById("aviso-boton");
// Funcion
function printConsole(message, color) {
  avisoTitulo.style.color = color;
  avisoTexto.innerText = message;
  avisoCont.style.display = "flex";
  setTimeout(() => {
    avisoCont.style.opacity = "100%";
  }, 20);
  setTimeout(() => {
    avisoCont.style.opacity = "0";
    setTimeout(() => {
      avisoCont.style.display = "none";
    }, 200);
  }, 1000 * 10);
}

socket.on("mensajesNuevos", (msg) => {
  if (msg.id == clientID) {
    let arrayMsj = msg.mensajes;
    if (arrayMsj.length == 0) {
      return;
    }
    contenedorMensajes.innerHTML = "";
    for (let i of arrayMsj) {
      let contDiv = document.createElement("div");
      contDiv.setAttribute("class", "mensaje");
      contDiv.setAttribute("id", `mensaje-${i.id}`);
      let iEquis = document.createElement("i");
      iEquis.setAttribute("class", "far fa-times-circle mensaje-equis");
      iEquis.setAttribute("id", `equis-id-${i.id}`);
      iEquis.addEventListener("click", () => {
        let mensajeSocket = {
          id: clientID,
          type: "delMensaje",
          msgID: i.id,
          adminPass: adminPass.value,
        };
        console.log("hola");
        socket.emit("mensaje", mensajeSocket);
      });
      contDiv.append(iEquis);
      let pNombre = document.createElement("p");
      pNombre.setAttribute("class", "mensaje-nombre");
      pNombre.innerText = `Nombre: ${i.nombre}`;
      contDiv.append(pNombre);
      let pEmail = document.createElement("p");
      pEmail.setAttribute("class", "mensaje-email");
      pEmail.innerText = `Email: ${i.email}`;
      contDiv.append(pEmail);
      let pTitCont = document.createElement("p");
      pTitCont.setAttribute("class", "titulo-mensaje");
      pTitCont.innerText = "Mensaje:";
      contDiv.append(pTitCont);
      let pContenido = document.createElement("p");
      pContenido.setAttribute("class", "mensaje-contenido");
      pContenido.innerText = `${i.contenido}`;
      contDiv.append(pContenido);
      let pID = document.createElement("p");
      pID.setAttribute("class", "mensaje-id");
      pID.innerText = i.id;
      contDiv.append(pID);
      let pFecha = document.createElement("p");
      pFecha.setAttribute("class", "mensaje-fecha");
      pFecha.innerText = `Fecha del mensaje: ${i.createdAt.slice(
        8,
        10
      )}/${i.createdAt.slice(5, 7)}/${i.createdAt.slice(0, 4)}`;
      contDiv.append(pFecha);
      contenedorMensajes.append(contDiv);
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
  if (contenidoRes.value.length > 245) {
    printConsole("Contenido de resumen supera los 245 caracteres", "red");
    return;
  }
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
    printConsole(msg.msg, "green");
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
      printConsole(`Error ${msg.mensaje}`, "red");
    }
  }
});

// Recibe errores
socket.on("error", (msg) => {
  printConsole(msg.error, "red");
});
