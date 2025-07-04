// socket client
const socket = io(); // default
const adminSocket = io("/admin");

const userEl = document.getElementById("user");
const textEl = document.getElementById("text");
const chatBoxEl = document.getElementById("chat-box");
const roomNameEl = document.getElementById("room-name");
const roomEl = document.getElementById("room");

adminSocket.on("greeting", (msg) => {
  console.log(msg);
});

// listen on server send message
socket.on("send message", (msg) => {
  const pEl = document.createElement("p");
  pEl.textContent = `${msg.username}: ${msg.message}`;

  chatBoxEl.appendChild(pEl);
  textEl.value = "";
});

socket.on("send room message", (msg) => {
  const pEl = document.createElement("p");
  pEl.textContent = `${msg.username}: ${msg.message}`;

  chatBoxEl.appendChild(pEl);
  textEl.value = "";
});

socket.on("join room success", (msg, roomName) => {
  roomEl.textContent = roomName;

  const pEl = document.createElement("p");
  pEl.textContent = msg;

  chatBoxEl.appendChild(pEl);
});

// send to server
function sendMessage() {
  // 1) check if we have joined a room
  if (roomEl.textContent) {
    socket.emit("send room message", {
      username: userEl.value,
      message: textEl.value,
      room: roomEl.textContent,
    });
  } else {
    // global chat
    socket.emit("send message", {
      username: userEl.value,
      message: textEl.value,
    });
  }
}

function joinRoom() {
  socket.emit("join room request", roomNameEl.value);
}
