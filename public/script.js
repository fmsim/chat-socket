// socket client
const socket = io();

const userEl = document.getElementById("user");
const textEl = document.getElementById("text");
const chatBoxEl = document.getElementById("chat-box");

// listen on server send message
socket.on("send message", (msg) => {
  const pEl = document.createElement("p");
  pEl.textContent = `${msg.username}: ${msg.message}`;

  chatBoxEl.appendChild(pEl);
  textEl.value = "";
});

socket.on("new user", (msg) => {
  const pEl = document.createElement("p");
  pEl.textContent = msg;

  chatBoxEl.appendChild(pEl);
});

// send to server
function sendMessage() {
  socket.emit("send message", {
    username: userEl.value,
    message: textEl.value,
  });
}
