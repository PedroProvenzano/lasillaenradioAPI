require("./conecciones/connection");
require("dotenv/config");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const SocketHandle = require("./mensajesSocket/mensajesSocket");
const mensajeSocket = new SocketHandle(io);

const noticias = require("./rutas/noticias");
const mensajes = require("./rutas/mensajes");
const checkPass = require("./middlewares/checkPass");
const { Socket } = require("dgram");
// Syncs
require("./conecciones/migraciones");

// Middlewares
app.use(bodyParser.json());
app.use("/noticias", checkPass, noticias);
app.use("/mensajes", checkPass, mensajes);
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

app.listen(port, () => {
  console.log(`Conectado y escuchando en el puerto ${port}`);
});
