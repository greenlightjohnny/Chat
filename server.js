const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder, you can set.
app.use(express.static(path.join(__dirname, "public")));

const botName = "Talkie";
///Run once a client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit("message", formMessage(botName, "Welcome"));

    //Notify when someone connects, broadcast sends to everyone except the person connecting.
    socket.broadcast
      .to(user.room)
      .emit("message", formMessage(botName, `${user.username} has joined`));
  });
  ///// socket.emit is to a single client

  ///io.broadcast, to everyone

  ///Listen for message from client chatMesssage, and sent back to everyone
  socket.on("chatMessage", (msg) => {
    io.emit("message", formMessage("User", msg));
  });

  ///Runs when someone leaves
  socket.on("disconnect", () => {
    io.emit("message", formMessage(botName, "Someone has left"));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
