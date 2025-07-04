// socket client
const socket = io(); // default
const adminSocket = io("/admin");
adminSocket.on("greeting", (msg) => {
  console.log(msg);
});

const textEl = document.getElementById("text");
const chatBoxEl = document.getElementById("chat-box");
const roomNameEl = document.getElementById("room-name");
const roomEl = document.getElementById("room");
const usersOnlineEl = document.getElementById("users-online");

const userName = prompt("Enter your name");
socket.emit("new user", userName);
socket.on("users online", (users) => {
  console.log(users);

  usersOnlineEl.textContent = "";

  users.forEach((user) => {
    const liEl = document.createElement("li");
    liEl.textContent = user;

    usersOnlineEl.appendChild(liEl);
  });
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
      username: userName,
      message: textEl.value,
      room: roomEl.textContent,
    });
  } else {
    // global chat
    socket.emit("send message", {
      username: userName,
      message: textEl.value,
    });
  }
}

function joinRoom() {
  socket.emit("join room request", roomNameEl.value);
}
