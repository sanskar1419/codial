class chatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    // We will now initialize the connection but write now no one is accepting it
    // io is a global object provided by socket.io cdn
    this.socket = io.connect("http://localhost:5000");
    // Now we need to call this connection handler to be able to run it
    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  //   This connection handler is used for to and fro interion between observer and subscriber or vica versa
  connectionHandler() {
    this.socket.on("connect", function () {
      console.log("connection established using socket");
    });
  }
}
