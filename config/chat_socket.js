module.exports.chatSockets = function (socketServer) {
  // Now we will recieve the request for connection
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection recieved", socket.id);
    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    // When the user ask to join the chatroom the request will recieve here
    socket.on("join_room", function (data) {
      console.log("Join request recieved", data);

      // once the request is recieved I want the user/socket to be joined
      // if the chat room already exist they will join that chat room otherwise it will create that chat room
      socket.join(data.chatroom);

      // Now once I joined the chatroom, all the other user should recieve a notification that a new user is joined
      io.in(data.chatroom).emit("user_joined", data);
    });

    // CHANGE :: detect send_message and broadcast to everyone in the room
    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
