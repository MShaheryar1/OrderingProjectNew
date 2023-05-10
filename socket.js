const http = require("http");
const socketio = require("socket.io");

const server = http.createServer();
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("A client has connected");

  socket.on("acceptOrder", (orderId) => {
    console.log(`Order ${orderId} has been accepted`);
    io.emit("orderAccepted", orderId);
  });

  socket.on("rejectOrder", (orderId) => {
    console.log(`Order ${orderId} has been rejected`);
    io.emit("orderRejected", orderId);
  });

  socket.on("disconnect", () => {
    console.log("A client has disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 4000");
});
