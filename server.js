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

  // event based api - send to client
  socket.emit("welcome", `Hi ${socket.id}`);

  // event based api - receive from client
  socket.on("client message", (msg) => {
    console.log(msg);
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
