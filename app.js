require("./conecciones/connection");
require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const SocketHandle = require("./mensajesSocket/mensajesSocket");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mensajeSocket = new SocketHandle(io);

const noticias = require("./rutas/noticias");
const mensajes = require("./rutas/mensajes");
// Syncs
require("./conecciones/migraciones");

// Middlewares
app.use(bodyParser.json());
app.use("/noticias", noticias);
app.use("/mensajes", mensajes);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("mensaje", (msg) => {
    mensajeSocket.HandleDatabase(msg);
    console.log("recibio mensaje");
  });
});

http.listen(port, () => {
  console.log(`Conectado y escuchando en el puerto ${port}`);
});
