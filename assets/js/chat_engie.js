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
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection established using socket");

      // When the connetion is established, then the user will join the virtual room created for him
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "codeial",
      });

      // Since the user is joined we will show the notification
      self.socket.on("user_joined", function (data) {
        console.log("a user joined", data);
      });
    });
    // CHANGE :: send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: "codeial",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message, data.user_email);

      let newMessage = $("<li>");

      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "self-message";
      }

      newMessage.append(
        $("<span>", {
          html: data.message,
        })
      );

      newMessage.append(
        $("<sub>", {
          html: data.user_email,
        })
      );

      newMessage.addClass(messageType);

      $("#chat-messages-list").append(newMessage);
    });
  }
}
