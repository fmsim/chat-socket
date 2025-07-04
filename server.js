const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 3000;

// default namespace
const io = new Server(server);

const adminIo = io.of("/admin");

adminIo.on("connection", (socket) => {
  console.log("Client connected to admin namespace", socket.id);

  adminIo.emit("greeting", "Welcome to admin channel");
});

const users = [];

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("new user", (userName) => {
    users.push({ id: socket.id, userName });

    // emit event to all users
    io.emit(
      "users online",
      users.map((u) => u.userName)
    );

    socket.on("disconnect", () => {
      // remove user
      const index = users.findIndex((u) => u.id === socket.id);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });
  });

  //  listen on client send message
  socket.on("send message", (msg) => {
    // send message to all clients
    io.emit("send message", msg);
  });

  socket.on("send room message", (msg) => {
    io.to(msg.room).emit("send room message", msg);
  });

  socket.on("join room request", (roomName) => {
    socket.join(roomName);
    socket.emit(
      "join room success",
      `you have been joined a room: ${roomName}`,
      roomName
    );
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
