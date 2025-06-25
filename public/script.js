// socket client
const socket = io();

socket.on("welcome", (msg) => {
  console.log(msg);
});

socket.emit("client message", "Message from client");
