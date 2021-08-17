var socket = io();

// Generar ID unica de cliente
let arrayID = new Uint32Array(3);
let cryptedID = window.crypto.getRandomValues(arrayID);
let clientID = cryptedID.toString("hex");
// Admin pass Input
const adminPass = document.getElementById("admin-pass");
if (localStorage.adminPass) {
  adminPass.value = localStorage.getItem("adminPass");
}
// Recibir mensajes
const botonRecibir = document.getElementById("boton-recibir");
botonRecibir.addEventListener("click", () => {
  recibirMensajes(adminPass.value);
});

function recibirMensajes(admin) {
  let recibirMensaje = {
    id: clientID,
    type: "getMensajes",
    adminPass: admin,
  };
  socket.emit("mensaje", recibirMensaje);
}
const botonSavePass = document.getElementById("saveButton");
botonSavePass.addEventListener("click", () => {
  localStorage.setItem("adminPass", adminPass.value);
});
const contenedorMensajes = document.getElementById("contenedor-mensajes");

// Consola
const avisoCont = document.getElementById("aviso-cont");
const avisoTitulo = document.getElementById("aviso-titulo");
const avisoTexto = document.getElementById("aviso-texto");
const avisoBoton = document.getElementById("aviso-boton");
// Function
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
avisoBoton.addEventListener("click", () => {
  avisoCont.style.opacity = "0";
  setTimeout(() => {
    avisoCont.style.display = "none";
  }, 200);
});
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
        socket.emit("mensaje", mensajeSocket);
      });
      contDiv.append(iEquis);
      let pNombre = document.createElement("p");
      pNombre.setAttribute("class", "mensaje-nombre");
      pNombre.innerText = `Nombre: ${i.nombre}`;
      contDiv.append(pNombre);
      let barrio = document.createElement("p");
      barrio.setAttribute("class", "mensaje-barrio");
      barrio.innerText = `Barrio: ${i.barrio}`;
      contDiv.append(barrio);
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
      pFecha.innerText = `Fecha del mensaje: ${i.date.slice(
        8,
        10
      )}/${i.date.slice(5, 7)}/${i.date.slice(0, 4)}`;
      contDiv.append(pFecha);
      contenedorMensajes.append(contDiv);
    }
  }
});

// Script De HUD
const botonNoticias = document.getElementById("titulo-noticias");
const botonMensajes = document.getElementById("titulo-mensajes");
const botonImagen = document.getElementById("titulo-imagen");
const botonTrivia = document.getElementById("titulo-trivia");
const botonMemes = document.getElementById("titulo-memes");

// Escenas
const noticias = document.getElementById("noticias");
const mensajes = document.getElementById("mensajes");
const imagen = document.getElementById("imagen");
const trivia = document.getElementById("trivia");
const meme = document.getElementById("meme");

botonNoticias.addEventListener("click", () => {
  noticias.style.display = "flex";
  mensajes.style.display = "none";
  imagen.style.display = "none";
  trivia.style.display = "none";
  meme.style.display = "none";
});

botonMensajes.addEventListener("click", () => {
  noticias.style.display = "none";
  mensajes.style.display = "flex";
  imagen.style.display = "none";
  trivia.style.display = "none";
  meme.style.display = "none";
});

botonImagen.addEventListener("click", () => {
  noticias.style.display = "none";
  mensajes.style.display = "none";
  imagen.style.display = "flex";
  trivia.style.display = "none";
  meme.style.display = "none";
});

botonTrivia.addEventListener("click", () => {
  noticias.style.display = "none";
  mensajes.style.display = "none";
  imagen.style.display = "none";
  trivia.style.display = "flex";
  meme.style.display = "none";
});

botonMemes.addEventListener("click", () => {
  noticias.style.display = "none";
  mensajes.style.display = "none";
  imagen.style.display = "none";
  trivia.style.display = "none";
  meme.style.display = "flex";
});

// Agregar links
const plusClick = document.getElementById("inputPlus");
const minusClick = document.getElementById("inputMinus");
const editLinks = document.getElementById("editLinks");
let cantidadLinks = 1;
plusClick.addEventListener("click", () => {
  let inputLink = document.createElement("input");
  inputLink.setAttribute("class", "editLinksInput");
  inputLink.setAttribute("id", "editLinksInput");
  editLinks.appendChild(inputLink);
  cantidadLinks++;
});
minusClick.addEventListener("click", () => {
  if (cantidadLinks > 1) {
    editLinks.removeChild(editLinks.lastChild);
    cantidadLinks--;
  }
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
const fuente = document.getElementById("fuente");
const contenedorBotones = document.getElementById("botones-contenedor");
let imagenesFinal;

let tagsFinal;

botonSend.addEventListener("click", () => {
  if (contenidoRes.value.length > 245) {
    printConsole("Contenido de resumen supera los 245 caracteres", "red");
    return;
  }
  imagenesFinal = [];
  let linksDom = document.getElementsByClassName("editLinksInput");
  for (let i of linksDom) {
    if (i.value != "") {
      imagenesFinal.push(i.value);
    }
  }
  if (imagenesFinal.length == 0) {
    printConsole("Faltan imagenes", "red");
    return;
  }
  imagenesFinal = JSON.stringify(imagenesFinal);
  tagsFinal = `[${tags.value}]`;
  let postNoticia = {
    id: clientID,
    adminPass: adminPass.value,
    type: "postNoticia",
    titulo: titulo.value,
    contenido: contenido.value,
    contenidoRes: contenidoRes.value,
    imagenesUrl: imagenesFinal,
    tags: tagsFinal.toLowerCase(),
    temaPrincipal: temaPrincipal.value,
    importancia: importancia.value,
    autor: autor.value,
    fuente: fuente.value,
  };
  socket.emit("mensaje", postNoticia);
  contenedorBotones.style.display = "none";
});

// Recibe respuesta de mensaje
socket.on("respPostNoticia", (msg) => {
  if (msg.id == clientID) {
    printConsole(msg.msg, "green");
    let linksDom = document.getElementsByClassName("editLinksInput");
    titulo.value = "";
    contenido.value = "";
    contenidoRes.value = "";
    for (let i of linksDom) {
      i.value = "";
    }
    tags.value = "";
    temaPrincipal.selectedIndex = "0";
    importancia.selectedIndex = "0";
    autor.value = "";
    fuente.value = "";
    contenedorBotones.style.display = "flex";
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
  if (msg.id == clientID) {
    printConsole(msg.error, "red");
    contenedorBotones.style.display = "flex";
  }
});

// Envia imagen del dia
const botonSendImg = document.getElementById("boton-send-img");
const imgDelDia = document.getElementById("imgDelDia");
const textAreaImg = document.getElementById("inputDescImg");
const inputImgDelDia = document.getElementById("inputImgDelDia");
const autorImgDelDia = document.getElementById("inputAutorImg");

botonSendImg.addEventListener("click", () => {
  if (textAreaImg.value.length > 245) {
    printConsole("Contenido de resumen supera los 245 caracteres", "red");
    return;
  }
  let postImg = {
    id: clientID,
    adminPass: adminPass.value,
    type: "postImagenDelDia",
    imgUrl: inputImgDelDia.value,
    descripcion: textAreaImg.value,
    autor: autorImgDelDia.value,
  };
  socket.emit("mensaje", postImg);
});

inputImgDelDia.addEventListener("change", () => {
  imgDelDia.src = inputImgDelDia.value;
});

// Enviar Trivia del dia

const inputPregunta = document.getElementById("inputPregunta");
const inputRespuestaUno = document.getElementById("inputRespuestaUno");
const inputRespuestaDos = document.getElementById("inputRespuestaDos");
const inputRespuestaTres = document.getElementById("inputRespuestaTres");
const inputSolucion = document.getElementById("inputSolucion");
const botonTriviaSend = document.getElementById("boton-send-trivia");

botonTriviaSend.addEventListener("click", () => {
  let postTrivia = {
    id: clientID,
    adminPass: adminPass.value,
    type: "postTrivia",
    pregunta: inputPregunta.value,
    respuestaUno: inputRespuestaUno.value,
    respuestaDos: inputRespuestaDos.value,
    respuestaTres: inputRespuestaTres.value,
    solucion: inputSolucion.value,
  };
  socket.emit("mensaje", postTrivia);
});

// Buscador de noticias
const inputBuscador = document.getElementById("buscador-input");
const botonBuscar = document.getElementById("boton-buscar");
const noticiaId = document.getElementById("noticia-id");

botonBuscar.addEventListener("click", () => {
  let msgEdit = {
    id: clientID,
    titulo: inputBuscador.value,
    type: "conseguirNoticia",
    adminPass: adminPass.value,
  };
  socket.emit("mensaje", msgEdit);
  inputBuscador.value = "";
});

// Recibir la noticia
socket.on("noticiaAEditar", (msg) => {
  titulo.value = msg.noticia.titulo;
  contenido.value = msg.noticia.contenido;
  contenidoRes.value = msg.noticia.contenidoRes;
  // tags
  let finishTag = msg.noticia.tags.slice(0, msg.noticia.tags.length - 1);
  finishTag = finishTag.slice(1, finishTag.length);
  tags.value = finishTag;
  fuente.value = msg.noticia.fuente;
  autor.value = msg.noticia.autor;
  noticiaId.value = msg.noticia.id;
  switch (msg.noticia.temaPrincipal) {
    case "actualidad":
      temaPrincipal.selectedIndex = 0;
      break;
    case "cultura":
      temaPrincipal.selectedIndex = 1;
      break;
    case "deporte":
      temaPrincipal.selectedIndex = 2;
      break;
    case "streaming":
      temaPrincipal.selectedIndex = 3;
      break;
    case "espectaculo":
      temaPrincipal.selectedIndex = 4;
      break;
    case "vida sana":
      temaPrincipal.selectedIndex = 5;
      break;
    case "medio ambiente":
      temaPrincipal.selectedIndex = 6;
      break;
    case "genero":
      temaPrincipal.selectedIndex = 7;
      break;
  }
  switch (msg.noticia.importancia) {
    case "normal":
      importancia.selectedIndex = 0;
      break;
    case "importante1":
      importancia.selectedIndex = 1;
      break;
    case "importante2":
      importancia.selectedIndex = 2;
      break;
    case "importante3":
      importancia.selectedIndex = 3;
      break;
    case "importante4":
      importancia.selectedIndex = 4;
      break;
  }
  noticias.style.backgroundColor = "rgb(98, 98, 252)";
});

const botonMandarEditar = document.getElementById("boton-editar");

botonMandarEditar.addEventListener("click", () => {
  let imagenesFinalEdit = [];
  let linksDom = document.getElementsByClassName("editLinksInput");
  for (let i of linksDom) {
    if (i.value != "") {
      imagenesFinalEdit.push(i.value);
    }
  }
  imagenesFinalEdit = JSON.stringify(imagenesFinalEdit);
  let tagsFinalEdit = `[${tags.value}]`;
  let msgEditar = {
    id: clientID,
    type: "postNoticia",
    adminPass: adminPass.value,
    noticiaId: noticiaId.value,
    titulo: titulo.value,
    contenido: contenido.value,
    contenidoRes: contenidoRes.value,
    imagenesUrl: imagenesFinalEdit,
    tags: tagsFinalEdit.toLowerCase(),
    temaPrincipal: temaPrincipal.value,
    importancia: importancia.value,
    autor: autor.value,
    fuente: fuente.value,
  };
  socket.emit("mensaje", msgEditar);
  contenedorBotones.style.display = "none";
  noticias.style.backgroundColor = "rgb(255, 224, 195)";
  titulo.value = "";
  contenido.value = "";
  contenidoRes.value = "";
  for (let i of linksDom) {
    i.value = "";
  }
  tags.value = "";
  temaPrincipal.selectedIndex = "0";
  importancia.selectedIndex = "0";
  autor.value = "";
  fuente.value = "";
  noticiaId.value = "";
});

const botonEliminar = document.getElementById("boton-eliminar");
botonEliminar.addEventListener("click", () => {
  if (noticiaId.value == "") {
    printConsole("Falta noticia", "red");
    return;
  }
  socket.emit("mensaje", {
    id: clientID,
    noticiaId: noticiaId.value,
    type: "eliminarNoticia",
    adminPass: adminPass.value,
  });
  noticias.style.backgroundColor = "rgb(255, 224, 195)";
  titulo.value = "";
  contenido.value = "";
  contenidoRes.value = "";
  for (let i of linksDom) {
    i.value = "";
  }
  tags.value = "";
  temaPrincipal.selectedIndex = "0";
  importancia.selectedIndex = "0";
  autor.value = "";
  fuente.value = "";
  noticiaId.value = "";
});

// Contador visitas
const contadorVisitas = document.getElementById("contador-visitas");

socket.emit("mensaje", {
  id: clientID,
  type: "contador",
});

socket.on("contador", (msg) => {
  console.log(msg);
  if (msg.id == clientID) {
    contadorVisitas.innerText = `Numero de visitas: ${msg.numerovisitas}`;
  }
});

// Memes
const ImgMemes = document.getElementById("imgMeme");
const inputImgMemes = document.getElementById("inputImgMeme");
const botonSendMemes = document.getElementById("boton-send-meme");

botonSendMemes.addEventListener("click", () => {
  let postMeme = {
    id: clientID,
    adminPass: adminPass.value,
    type: "postMeme",
    imgUrl: inputImgMemes.value,
  };
  socket.emit("mensaje", postMeme);
});

inputImgMemes.addEventListener("change", () => {
  ImgMemes.src = inputImgMemes.value;
});
