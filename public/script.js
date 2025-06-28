// socket client
const socket = io();

socket.on("welcome", (msg) => {
  console.log(msg);
});

socket.on("update", (msg, cb) => {
  const { item1, item2, item3 } = msg;

  if (true) {
    cb("Hello");
  }
});

socket.emit("client message", "Message from client");
