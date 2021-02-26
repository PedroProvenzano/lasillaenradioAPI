require("dotenv/config");

class SocketHandle {
  constructor(io) {
    this.io = io;
  }

  async HandleDatabase(msg) {
    if (msg.adminPass != process.env.ADMIN_PASS) {
      return this.io.emit("Admin pass incorrecta");
    }
    if (msg.type == "postNoticia") {
      console.log("Posteo noticia" + msg);
    }
  }
}

module.exports = SocketHandle;
