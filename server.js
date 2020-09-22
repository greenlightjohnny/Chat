const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder, you can set.
app.use(express.static(path.join(__dirname, "public")));

///Run once a client connects
io.on("connection", (socket) => {
  ///// socket.emit is to a single client
  socket.emit("message", "Welcome!");

  ///Runs when someone leaves
  socket.on("disconnect", () => {
    io.emit("message", "Someone has left the chat");
  });

  ///Notify when someone connects, broadcast sends to everyone except the person connecting.
  socket.broadcast.emit("message", "Someone joined");

  ///io.broadcast, to everyone

  ///Listen for message from client chatMesssage, and sent back to everyone
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
