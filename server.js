const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  // send message to all clients except myself
  socket.broadcast.emit(
    "new user",
    "A new user has been joined to the application"
  );

  //  listen on client send message
  socket.on("send message", (msg) => {
    // send message to all clients
    io.emit("send message", msg);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all messages
app.get("/messages", (req, res) => {});

// Send messages
app.post("/messages", (req, res) => {});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
