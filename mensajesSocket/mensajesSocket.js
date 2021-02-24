class SocketHandle {
  constructor(io) {
    this.io = io;
  }

  async HandleDatabase(msg) {
    if (msg.type == "postNoticia") {
      console.log("Posteo noticia" + msg);
    }
  }
}

module.exports = SocketHandle;
