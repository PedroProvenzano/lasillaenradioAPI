require("./conexiones/connection");
require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const SocketHandle = require("./mensajesSocket/mensajesSocket");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mensajeSocket = new SocketHandle(io);
const cors = require("cors");
const noticias = require("./rutas/noticias");
const mensajes = require("./rutas/mensajes");
const imagen = require("./rutas/imagen");
const trivia = require("./rutas/trivia");
const visitas = require("./rutas/visitas");
const entrevista = require("./rutas/entrevista");
const meme = require("./rutas/meme");
// Syncs
require("./conexiones/migraciones");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/noticias", noticias);
app.use("/mensajes", mensajes);
app.use("/imagen", imagen);
app.use("/trivia", trivia);
app.use("/visitas", visitas);
app.use("/meme", meme);
app.use("/entrevista", entrevista);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("mensaje", (msg) => {
    mensajeSocket.HandleDatabase(msg);
  });
});

http.listen(port, () => {
  console.log(`Conectado y escuchando en el puerto ${port}`);
});
