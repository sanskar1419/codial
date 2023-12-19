module.exports.chatSockets = function (socketServer) {
  // Now we will recieve the request for connection
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection recieved", socket.id);
  });
};
