const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server);
io.on("connection", () => {
  console.log("Client connected");
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
